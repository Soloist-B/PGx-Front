import { GeneMapping } from "../genotypeTypes";

/** HLA-B*15:02 — ใช้สำหรับ carbamazepine/oxcarbazepine SJS/TEN risk */
export const HLAB: GeneMapping = {
  markers: [
    {
      name: "HLA-B*15:02 status",
      options: [
        { label: "Negative", value: "Negative" },
        { label: "Positive", value: "Positive" },
      ],
    },
  ],
  genotypes: [
    { genotype: "Negative", phenotype: "No increased SJS/TEN risk for HLA-B*15:02", recommendation: "ใช้ยาได้ตามดุลยพินิจ (พิจารณาปัจจัยเสี่ยงอื่นร่วมด้วย)" },
    { genotype: "Positive", phenotype: "High risk of SJS/TEN", recommendation: "หลีกเลี่ยง carbamazepine/oxcarbazepine; ใช้ยาทางเลือก" },
  ],
  mapToGenotype: (values) => {
    const v = values["HLA-B*15:02 status"];
    if (!v) return "";
    return v; // Positive/Negative เป็นผลลัพธ์โดยตรง
  },
};
