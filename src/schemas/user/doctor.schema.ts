import { z } from "zod";

export const newDoctorSchema = z.object({
  Staff_Id: z.number().int().positive(),
}).strict();

export const updateDoctorSchema = z.object({
  Staff_Id: z.number().int().positive().optional(),
}).strict();

export type NewDoctorInput = z.infer<typeof newDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof updateDoctorSchema>;
