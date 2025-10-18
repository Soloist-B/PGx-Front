import { GeneMapping } from "../genotypeTypes";

/** ชีท TPMT — ตัวอย่างชุดที่พบบ่อยจากแนวปฏิบัติ */
export const TPMT: GeneMapping = {
  markers: [
    {
      name: "TPMT*3C (719A>G)",
      options: [
        { label: "A/A", value: "A/A" },
        { label: "A/G", value: "A/G" },
        { label: "G/G", value: "G/G" },
      ],
    },
  ],
  genotypes: [
    { genotype: "*1/*1", phenotype: "Normal activity", recommendation: "เริ่มขนาดมาตรฐานของ thiopurines และติดตามค่าทางห้องปฏิบัติการ" },
    { genotype: "*1/*3C", phenotype: "Intermediate activity", recommendation: "พิจารณาลดขนาด (~30–70%) สำหรับ thiopurines และติดตาม CBC/LFT ใกล้ชิด" },
    { genotype: "*3C/*3C", phenotype: "Low/Poor activity", recommendation: "หลีกเลี่ยง thiopurines หรือใช้ขนาดต่ำมาก พร้อมเฝ้าระวังอย่างใกล้ชิด" },
  ],
  mapToGenotype: (values) => {
    const v = values["TPMT*3C (719A>G)"];
    if (!v) return "";
    if (v === "A/A") return "*1/*1";
    if (v === "A/G") return "*1/*3C";
    if (v === "G/G") return "*3C/*3C";
    return "";
  },
};
