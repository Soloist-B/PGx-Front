import { z } from "zod";

export const newAdminSchema = z.object({
  Staff_Id: z.number().int().positive(),
}).strict();

export const updateAdminSchema = z.object({
  Staff_Id: z.number().int().positive().optional(),
}).strict();

export type NewAdminInput = z.infer<typeof newAdminSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>;
