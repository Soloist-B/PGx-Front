export interface CYP3A5 {
  CYP3A5_Id: number;     // PK (int8)
  CYPx3_6986A: string;   // varchar
  Predict_Geno: string;  // varchar
  Likely_Pheno: string;  // varchar
  Recommend: string;     // varchar
}

export type NewCYP3A5 = Omit<CYP3A5, "CYP3A5_Id">;
export type UpdateCYP3A5 = Partial<NewCYP3A5>;
