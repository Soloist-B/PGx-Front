import { GeneMapping } from "../genotypeTypes";

/** ตามตาราง CYP2C9*2 (430C>T) และ *3 (1075A>C) */
export const CYP2C9: GeneMapping = {
  markers: [
    {
      name: "CYP2C9*2 (430C>T)",
      options: [
        { label: "C/C", value: "C/C" },
        { label: "C/T", value: "C/T" },
        { label: "T/T", value: "T/T" },
      ],
    },
    {
      name: "CYP2C9*3 (1075A>C)",
      options: [
        { label: "A/A", value: "A/A" },
        { label: "A/C", value: "A/C" },
        { label: "C/C", value: "C/C" },
      ],
    },
  ],
  genotypes: [
    { genotype: "*1/*1", phenotype: "Normal metabolizer (NM)", recommendation: "ใช้ยาได้ตามมาตรฐาน" },
    { genotype: "*1/*2", phenotype: "Intermediate metabolizer (IM)", recommendation: "พิจารณาปรับลดขนาดยาเมื่อเริ่มต้น และติดตามผล" },
    { genotype: "*1/*3", phenotype: "Intermediate metabolizer (IM)", recommendation: "พิจารณาปรับลดขนาดยาเมื่อเริ่มต้น และติดตามผล" },
    { genotype: "*2/*2", phenotype: "Intermediate metabolizer (IM)", recommendation: "เฝ้าระวัง/อาจลดขนาดยา" },
    { genotype: "*2/*3", phenotype: "Poor metabolizer (PM)", recommendation: "พิจารณาลดขนาดมาก/เลือกยาทางเลือก" },
    { genotype: "*3/*3", phenotype: "Poor metabolizer (PM)", recommendation: "พิจารณาลดขนาดมาก/เลือกยาทางเลือก" },
  ],
  mapToGenotype: (values) => {
    const v2 = values["CYP2C9*2 (430C>T)"];
    const v3 = values["CYP2C9*3 (1075A>C)"];
    if (!v2 || !v3) return "";

    const count2 = v2 === "C/T" ? 1 : v2 === "T/T" ? 2 : 0;
    const count3 = v3 === "A/C" ? 1 : v3 === "C/C" ? 2 : 0;
    const count1 = Math.max(0, 2 - (count2 + count3));

    const alleles: string[] = [];
    for (let i = 0; i < count1; i++) alleles.push("*1");
    for (let i = 0; i < count2; i++) alleles.push("*2");
    for (let i = 0; i < count3; i++) alleles.push("*3");

    if (alleles.length !== 2) return "";
    const order: Record<string, number> = { "*1": 1, "*2": 2, "*3": 3 };
    alleles.sort((a,b) => order[a]-order[b]);
    return `${alleles[0]}/${alleles[1]}`;
  },
};
