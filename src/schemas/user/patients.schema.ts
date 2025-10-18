// src/types/patient.schema.ts
import { z } from "zod";

export const newPatientSchema = z.object({
  Fname: z.string().min(1),
  Lname: z.string().min(1),
  Age: z.number().int().nonnegative(),
  Gender: z.string().min(1),
  Phone: z.string().min(1),
  Id_Card: z.string().min(1),
  Ethnicity: z.string().min(1),
}).strict();

export const updatePatientSchema = newPatientSchema.partial().strict();

export type NewPatientInput = z.infer<typeof newPatientSchema>;
export type UpdatePatientInput = z.infer<typeof updatePatientSchema>;
