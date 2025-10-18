import { z } from "zod";

export const newCYP2C9Schema = z.object({
  CYP2C9x2_430C: z.string().min(1),
  CYP2C9x3_1075A: z.string().min(1),
  Predict_Geno: z.string().min(1),
  Predict_Pheno: z.string().min(1),
  Recommend: z.string().min(1),
}).strict();

export const updateCYP2C9Schema = newCYP2C9Schema.partial().strict();

export type NewCYP2C9Input = z.infer<typeof newCYP2C9Schema>;
export type UpdateCYP2C9Input = z.infer<typeof updateCYP2C9Schema>;
