import { z } from "zod";

export const newTPMTSchema = z.object({
  TPMTx3C_719A: z.string().min(1),
  Predict_Geno: z.string().min(1),
  Predict_Pheno: z.string().min(1),
  Recommend: z.string().min(1),
}).strict();

export const updateTPMTSchema = newTPMTSchema.partial().strict();

export type NewTPMTInput = z.infer<typeof newTPMTSchema>;
export type UpdateTPMTInput = z.infer<typeof updateTPMTSchema>;
