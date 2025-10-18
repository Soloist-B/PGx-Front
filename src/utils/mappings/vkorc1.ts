import { GeneMapping } from "../genotypeTypes";

/** ตามชีท VKORC1 (1173C>T) และ (-1639G>A) + Haplotype BB/AB/AA */
export const VKORC1: GeneMapping = {
  markers: [
    {
      name: "VKORC1 (1173C>T)",
      options: [
        { label: "C/C", value: "C/C" },
        { label: "C/T", value: "C/T" },
        { label: "T/T", value: "T/T" },
      ],
    },
    {
      name: "VKORC1 (-1639G>A)",
      options: [
        { label: "G/G", value: "G/G" },
        { label: "G/A", value: "G/A" },
        { label: "A/A", value: "A/A" },
      ],
    },
  ],
  genotypes: [
    { genotype: "BB (C/C | G/G)", phenotype: "Low Warfarin Sensitivity (ต้องการขนาดสูงกว่า)", recommendation: "ขนาดมาตรฐานหรือสูงกว่า เฝ้าระวัง INR" },
    { genotype: "AB (C/T | G/A)", phenotype: "Intermediate Warfarin Sensitivity", recommendation: "เริ่มขนาดต่ำและติดตาม INR" },
    { genotype: "AA (T/T | A/A)", phenotype: "High Warfarin Sensitivity", recommendation: "เริ่มขนาดต่ำมากและติดตาม INR ใกล้ชิด" },
  ],
  mapToGenotype: (values) => {
    const v1173 = values["VKORC1 (1173C>T)"];
    const v1639 = values["VKORC1 (-1639G>A)"];
    if (!v1173 || !v1639) return "";
    if (v1173 === "C/C" && v1639 === "G/G") return "BB (C/C | G/G)";
    if (v1173 === "T/T" && v1639 === "A/A") return "AA (T/T | A/A)";
    return "AB (mixed)";
  },
};
