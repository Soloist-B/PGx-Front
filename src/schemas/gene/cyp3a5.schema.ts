import { z } from "zod";

export const newCYP3A5Schema = z.object({
  CYPx3_6986A: z.string().min(1),
  Predict_Geno: z.string().min(1),
  Likely_Pheno: z.string().min(1),
  Recommend: z.string().min(1),
}).strict();

export const updateCYP3A5Schema = newCYP3A5Schema.partial().strict();

export type NewCYP3A5Input = z.infer<typeof newCYP3A5Schema>;
export type UpdateCYP3A5Input = z.infer<typeof updateCYP3A5Schema>;
