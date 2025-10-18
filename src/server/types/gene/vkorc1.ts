export interface VKORC1 {
  VKORC1_Id: number;
  P1173C: string;        // 👈 เปลี่ยนให้ตรง DB
  P1639G: string;        // 👈 เปลี่ยนให้ตรง DB
  Haplotype: string;
  Predict_Pheno: string;
  Recommend: string;
}

export type NewVKORC1 = Omit<VKORC1, "VKORC1_Id">;
export type UpdateVKORC1 = Partial<NewVKORC1>;
