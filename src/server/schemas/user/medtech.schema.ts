import { z } from "zod";

export const newMedTechSchema = z.object({
  Staff_Id: z.number().int().positive(),
}).strict();

export const updateMedTechSchema = z.object({
  Staff_Id: z.number().int().positive().optional(),
}).strict();

export type NewMedTechInput = z.infer<typeof newMedTechSchema>;
export type UpdateMedTechInput = z.infer<typeof updateMedTechSchema>;
