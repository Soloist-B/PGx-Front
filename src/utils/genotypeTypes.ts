export type MarkerOption = { label: string; value: string };

export type Marker = {
  name: string;
  description?: string;
  options: MarkerOption[];
};

export type GenotypeRow = {
  /** key ที่มนุษย์อ่านง่าย เช่น "*1/*2" หรือ "C/C | A/A" หรือใส่รายละเอียดตามตาราง */
  genotype: string;
  /** สรุป phenotype */
  phenotype: string;
  /** คำแนะนำการรักษา (ภาษาไทยได้) */
  recommendation: string;
};

export type GeneMapping = {
  /** ตัวเลือก SNP/marker per gene */
  markers: Marker[];
  /** ตาราง mapping ที่ “ครบตามแถว” ของไฟล์ */
  genotypes: GenotypeRow[];
  /** ฟังก์ชันคำนวณ genotype (diplotype/haplotype) จาก marker values */
  mapToGenotype: (values: Record<string, string>) => string;
};

export type MappingTable = Record<string, GeneMapping>;
