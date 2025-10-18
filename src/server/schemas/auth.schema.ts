import { z } from "zod";

const Roles = ['admin','doctor','pharmacist','medtech'] as const;

export const registerSchema = z.object({
  Fname: z.string().min(1).trim(),
  Lname: z.string().min(1).trim(),
  Role: z.string().trim().toLowerCase()
    .refine(v => (Roles as readonly string[]).includes(v), "Role must be one of admin|doctor|pharmacist|medtech"),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  Hospital_Name: z.string().min(1).trim(),
}).strict();

export const loginSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(1),
}).strict();

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
