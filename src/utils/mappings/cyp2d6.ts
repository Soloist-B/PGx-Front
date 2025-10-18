import { GeneMapping } from "../genotypeTypes";

/**
 * CYP2D6 — markers หลัก + CNV intron2 / exon9
 * ครบทั้ง 33 case จาก Excel
 */
export const CYP2D6: GeneMapping = {
  markers: [
    {
      name: "CYP2D6*4 (1847G>A)",
      options: [
        { label: "-", value: "-" },
        { label: "G/G", value: "G/G" },
        { label: "G/A", value: "G/A" },
        { label: "A/A", value: "A/A" },
      ],
    },
    {
      name: "CYP2D6*10 (100C>T)",
      options: [
        { label: "-", value: "-" },
        { label: "C/C", value: "C/C" },
        { label: "C/T", value: "C/T" },
        { label: "T/T", value: "T/T" },
      ],
    },
    {
      name: "CYP2D6*41 (2989G>A)",
      options: [
        { label: "-", value: "-" },
        { label: "G/G", value: "G/G" },
        { label: "G/A", value: "G/A" },
        { label: "A/A", value: "A/A" },
      ],
    },
    {
      name: "CNV intron 2",
      options: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    {
      name: "CNV exon 9",
      options: [
        { label: "0", value: "0" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
      ],
    },
  ],

  genotypes: [
    { genotype: "*5/*5 (CNV intron2: 0 | CNV exon9: 0)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
    { genotype: "*1/*5 (G/G | C/C | G/G | CNV 1|1)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*4/*5 (A/A | T/T | G/G | CNV 1|1)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
    { genotype: "*5/*10 (G/G | T/T | G/G | CNV 1|1)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*5/*41 (G/G | C/C | A/A | CNV 1|1)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*1/*1 (G/G | C/C | G/G | CNV 2|2)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "*1/*4 (G/A | C/T | G/G | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*1/*10 (G/G | C/T | G/G | CNV 2|2)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "*1/*41 (G/G | C/C | G/A | CNV 2|2)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "*4/*4 (A/A | T/T | G/G | CNV 2|2)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
    { genotype: "*10/*10 (G/G | T/T | G/G | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*41/*41 (G/G | C/C | A/A | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*4/*10 (G/A | T/T | G/G | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*4/*41 (G/A | C/T | G/A | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*10/*41 (G/G | C/T | G/A | CNV 2|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "(*1/*1)×N (CNV 3|3)", phenotype: "UM", recommendation: `ตรวจพบ gene duplication` },
    { genotype: "(*1/*10)×N (G/G | T/T | G/G | CNV 3|3)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "(*1/*41)×N (G/G | C/C | G/A | CNV 3|3)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "(*4/*4)×N (A/A | T/T | G/G | CNV 3|3)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
    { genotype: "(*10/*10)×N (G/G | T/T | G/G | CNV 3|3)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "(*41/*41)×N (G/G | C/C | A/A | CNV 3|3)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*4/*36 (G/A | T/T | G/G | CNV 2|1)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
    { genotype: "*1/*36+*10 (G/G | C/T | G/G | CNV 2|1)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*36/*41 (G/G | C/T | G/A | CNV 2|1)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*4/*36+*10 (G/A | T/T | G/G | CNV 3|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*1/*36+*10 (G/G | C/T | G/G | CNV 3|2)", phenotype: "NM", recommendation: `ใช้ยาขนาดมาตรฐาน` },
    { genotype: "*10+*36/*41 (G/G | C/T | G/A | CNV 3|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*10/*36+*10 (G/G | T/T | G/G | CNV 3|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*36+*10/*36+*10 (G/G | T/T | G/G | CNV 4|2)", phenotype: "IM", recommendation: `ดูแนวทาง IM` },
    { genotype: "*5/*36 (G/G | T/T | G/G | CNV 1|0)", phenotype: "PM", recommendation: `ดูแนวทาง PM` },
  ],

  mapToGenotype: (values) => {
    const g4 = values["CYP2D6*4 (1847G>A)"] || "-";
    const g10 = values["CYP2D6*10 (100C>T)"] || "-";
    const g41 = values["CYP2D6*41 (2989G>A)"] || "-";
    const cnv2 = values["CNV intron 2"] || "";
    const cnv9 = values["CNV exon 9"] || "";

    // ✅ return string ให้ตรงกับ genotypes[].genotype
    if (g4 === "-" && g10 === "-" && g41 === "-" && cnv2 === "0" && cnv9 === "0") return "*5/*5 (CNV intron2: 0 | CNV exon9: 0)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "G/G" && cnv2 === "1" && cnv9 === "1") return "*1/*5 (G/G | C/C | G/G | CNV 1|1)";
    if (g4 === "A/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "1" && cnv9 === "1") return "*4/*5 (A/A | T/T | G/G | CNV 1|1)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "1" && cnv9 === "1") return "*5/*10 (G/G | T/T | G/G | CNV 1|1)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "A/A" && cnv2 === "1" && cnv9 === "1") return "*5/*41 (G/G | C/C | A/A | CNV 1|1)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*1/*1 (G/G | C/C | G/G | CNV 2|2)";
    if (g4 === "G/A" && g10 === "C/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*1/*4 (G/A | C/T | G/G | CNV 2|2)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*1/*10 (G/G | C/T | G/G | CNV 2|2)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "G/A" && cnv2 === "2" && cnv9 === "2") return "*1/*41 (G/G | C/C | G/A | CNV 2|2)";
    if (g4 === "A/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*4/*4 (A/A | T/T | G/G | CNV 2|2)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*10/*10 (G/G | T/T | G/G | CNV 2|2)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "A/A" && cnv2 === "2" && cnv9 === "2") return "*41/*41 (G/G | C/C | A/A | CNV 2|2)";
    if (g4 === "G/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "2") return "*4/*10 (G/A | T/T | G/G | CNV 2|2)";
    if (g4 === "G/A" && g10 === "C/C" && g41 === "G/A" && cnv2 === "2" && cnv9 === "2") return "*4/*41 (G/A | C/C | G/A | CNV 2|2)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/A" && cnv2 === "2" && cnv9 === "2") return "*10/*41 (G/G | C/T | G/A | CNV 2|2)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "G/G" && cnv2 === "3" && cnv9 === "3") return "(*1/*1)×N (CNV 3|3)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "3") return "(*1/*10)×N (G/G | T/T | G/G | CNV 3|3)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "G/A" && cnv2 === "3" && cnv9 === "3") return "(*1/*41)×N (G/G | C/C | G/A | CNV 3|3)";
    if (g4 === "A/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "3") return "(*4/*4)×N (A/A | T/T | G/G | CNV 3|3)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "3") return "(*10/*10)×N (G/G | T/T | G/G | CNV 3|3)";
    if (g4 === "G/G" && g10 === "C/C" && g41 === "A/A" && cnv2 === "3" && cnv9 === "3") return "(*41/*41)×N (G/G | C/C | A/A | CNV 3|3)";
    if (g4 === "G/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "1") return "*4/*36 (G/A | T/T | G/G | CNV 2|1)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/G" && cnv2 === "2" && cnv9 === "1") return "*1/*36+*10 (G/G | C/T | G/G | CNV 2|1)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/A" && cnv2 === "2" && cnv9 === "1") return "*36/*41 (G/G | C/T | G/A | CNV 2|1)";
    if (g4 === "G/A" && g10 === "T/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "2") return "*4/*36+*10 (G/A | T/T | G/G | CNV 3|2)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "2") return "*1/*36+*10 (G/G | C/T | G/G | CNV 3|2)";
    if (g4 === "G/G" && g10 === "C/T" && g41 === "G/A" && cnv2 === "3" && cnv9 === "2") return "*10+*36/*41 (G/G | C/T | G/A | CNV 3|2)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "3" && cnv9 === "2") return "*10/*36+*10 (G/G | T/T | G/G | CNV 3|2)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "4" && cnv9 === "2") return "*36+*10/*36+*10 (G/G | T/T | G/G | CNV 4|2)";
    if (g4 === "G/G" && g10 === "T/T" && g41 === "G/G" && cnv2 === "1" && cnv9 === "0") return "*5/*36 (G/G | T/T | G/G | CNV 1|0)";

    return "";
  },
};
