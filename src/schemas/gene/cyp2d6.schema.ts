import { z } from "zod";

export const newCYP2D6Schema = z.object({
  CYP2D6x4_1847G: z.string().min(1),
  CYP2D6x10_100C: z.string().min(1),
  CYP2D6x41_2989G: z.string().min(1),
  CNV_Intron: z.string().min(1),
  CNV_Exon: z.string().min(1),
  Result: z.string().min(1),
  Phenotype: z.string().min(1),
  Predict_Pheno: z.string().min(1),
  Recommend: z.string().min(1),
}).strict();

export const updateCYP2D6Schema = newCYP2D6Schema.partial().strict();

export type NewCYP2D6Input = z.infer<typeof newCYP2D6Schema>;
export type UpdateCYP2D6Input = z.infer<typeof updateCYP2D6Schema>;
