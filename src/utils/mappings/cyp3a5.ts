import { GeneMapping } from "../genotypeTypes";

/** ชีท CYP3A5 — โฟกัส *1/*1, *1/*3, *3/*3 */
export const CYP3A5: GeneMapping = {
  markers: [
    {
      name: "CYP3A5*3 (6986A>G)",
      options: [
        { label: "A/A", value: "A/A" },
        { label: "A/G", value: "A/G" },
        { label: "G/G", value: "G/G" },
      ],
    },
  ],
  genotypes: [
    { genotype: "*1/*1", phenotype: "Expressor (สูง)", recommendation: "อาจต้องใช้ขนาดยาที่เป็น substrate สูงกว่ามาตรฐาน และติดตามระดับยา" },
    { genotype: "*1/*3", phenotype: "Intermediate expressor", recommendation: "ขนาดยาเริ่มต้นปกติ/ปรับตามระดับยา" },
    { genotype: "*3/*3", phenotype: "Non-expressor", recommendation: "มักใช้ขนาดมาตรฐาน/ปรับตามระดับยา" },
  ],
  mapToGenotype: (values) => {
    const v = values["CYP3A5*3 (6986A>G)"];
    if (!v) return "";
    if (v === "A/A") return "*1/*1";
    if (v === "A/G") return "*1/*3";
    if (v === "G/G") return "*3/*3";
    return "";
  },
};
