import { z } from "zod";

export const newPharmacistSchema = z.object({
  Staff_Id: z.number().int().positive(),
}).strict();

export const updatePharmacistSchema = z.object({
  Staff_Id: z.number().int().positive().optional(),
}).strict();

export type NewPharmacistInput = z.infer<typeof newPharmacistSchema>;
export type UpdatePharmacistInput = z.infer<typeof updatePharmacistSchema>;
