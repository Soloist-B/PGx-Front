import { z } from "zod";

export const newVKORC1Schema = z.object({
  P1173C: z.string().min(1),    // 👈 ใช้ชื่อเดียวกับ DB
  P1639G: z.string().min(1),
  Haplotype: z.string().min(1),
  Predict_Pheno: z.string().min(1),
  Recommend: z.string().min(1),
}).strict();

export const updateVKORC1Schema = newVKORC1Schema.partial().strict();

export type NewVKORC1Input = z.infer<typeof newVKORC1Schema>;
export type UpdateVKORC1Input = z.infer<typeof updateVKORC1Schema>;
