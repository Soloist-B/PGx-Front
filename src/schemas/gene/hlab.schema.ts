import { z } from "zod";

export const newHLABSchema = z.object({
  HLA_Gene: z.string().min(1),
  Drugs: z.string().min(1),
  Types_of_Scar: z.string().min(1),
  Ethic_groups: z.string().min(1),
  Odd_ratios: z.string().min(1),
  Referances: z.string().min(1),
}).strict();

export const updateHLABSchema = newHLABSchema.partial().strict();

export type NewHLABInput = z.infer<typeof newHLABSchema>;
export type UpdateHLABInput = z.infer<typeof updateHLABSchema>;
