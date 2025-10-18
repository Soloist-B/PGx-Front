import { GeneMapping } from "../genotypeTypes";

/** ตามชีท CYP2C19 — markers: *2 (681G>A), *3 (636G>A), *17 (-806C>T) */
export const CYP2C19: GeneMapping = {
  markers: [
    {
      name: "CYP2C19*2 (681G>A)",
      options: [
        { label: "G/G", value: "G/G" },
        { label: "G/A", value: "G/A" },
        { label: "A/A", value: "A/A" },
      ],
    },
    {
      name: "CYP2C19*3 (636G>A)",
      options: [
        { label: "G/G", value: "G/G" },
        { label: "G/A", value: "G/A" },
        { label: "A/A", value: "A/A" },
      ],
    },
    {
      name: "CYP2C19*17 (-806C>T)",
      options: [
        { label: "C/C", value: "C/C" },
        { label: "C/T", value: "C/T" },
        { label: "T/T", value: "T/T" },
      ],
    },
  ],
  /** ตารางแถวตามภาพชีทของมึง (10 แถว) — คงข้อมูลเดิมทั้งหมด */
  genotypes: [
    { genotype: "*1/*1", phenotype: "Normal metabolizer (NM)", recommendation: "สามารถใช้ยาที่เกี่ยวข้องในขนาดมาตรฐาน" },
    { genotype: "*1/*2", phenotype: "Intermediate metabolizer (IM)", recommendation: "ประสิทธิผลลดลง พิจารณาปรับยา/เลือกทางเลือก" },
    { genotype: "*1/*3", phenotype: "Intermediate metabolizer (IM)", recommendation: "ประสิทธิผลลดลง พิจารณาปรับยา/เลือกทางเลือก" },
    { genotype: "*1/*17", phenotype: "Rapid metabolizer (RM)", recommendation: "บางยาต้องเพิ่มขนาด/เฝ้าระวังระดับยา โดยเฉพาะ non-prodrug" },
    { genotype: "*2/*2", phenotype: "Poor metabolizer (PM)", recommendation: "หลีกเลี่ยงยาที่ต้องอาศัย CYP2C19 หรือใช้ทางเลือก" },
    { genotype: "*2/*3", phenotype: "Poor metabolizer (PM)", recommendation: "หลีกเลี่ยงยาที่ต้องอาศัย CYP2C19 หรือใช้ทางเลือก" },
    { genotype: "*2/*17", phenotype: "Intermediate metabolizer (IM)", recommendation: "ประสิทธิผลลดลง พิจารณาปรับยา" },
    { genotype: "*3/*3", phenotype: "Poor metabolizer (PM)", recommendation: "หลีกเลี่ยงหรือใช้ทางเลือก" },
    { genotype: "*3/*17", phenotype: "Intermediate metabolizer (IM)", recommendation: "ประสิทธิผลลดลง พิจารณาปรับยา" },
    { genotype: "*17/*17", phenotype: "Ultrarapid metabolizer (UM)", recommendation: "บางยาต้องเพิ่มขนาด/เฝ้าระวังระดับยา" },
  ],
  mapToGenotype: (values) => {
    const v2 = values["CYP2C19*2 (681G>A)"];
    const v3 = values["CYP2C19*3 (636G>A)"];
    const v17 = values["CYP2C19*17 (-806C>T)"];
    if (!v2 || !v3 || !v17) return "";

    const count2  = v2  === "G/A" ? 1 : v2  === "A/A" ? 2 : 0;
    const count3  = v3  === "G/A" ? 1 : v3  === "A/A" ? 2 : 0;
    const count17 = v17 === "C/T" ? 1 : v17 === "T/T" ? 2 : 0;
    const count1  = Math.max(0, 2 - (count2 + count3 + count17));

    const alleles: string[] = [];
    for (let i = 0; i < count1; i++) alleles.push("*1");
    for (let i = 0; i < count2; i++) alleles.push("*2");
    for (let i = 0; i < count3; i++) alleles.push("*3");
    for (let i = 0; i < count17; i++) alleles.push("*17");

    if (alleles.length !== 2) return "";
    const order: Record<string, number> = { "*1": 1, "*2": 2, "*3": 3, "*17": 17 };
    alleles.sort((a,b) => order[a]-order[b]);
    return `${alleles[0]}/${alleles[1]}`;
  },
};
