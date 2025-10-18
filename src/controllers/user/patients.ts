import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { Patient, NewPatient, UpdatePatient } from "../../types/user/patients";
import { newPatientSchema, updatePatientSchema } from "../../schemas/user/patients.schema";



// GET /api/patients
export async function getPatients(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("Patients")
      .select("*")
      .limit(50)
      .returns<Patient[]>(); // 👈 type-safe

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/patients
export async function createPatient(req: Request, res: Response) {
  try {
    // ✅ validate body
    const payload = newPatientSchema.parse(req.body) as NewPatient;

    const { data, error } = await supabase
      .from("Patients")
      .insert(payload)
      .select("*")
      .single()
      .returns<Patient>(); // 👈 type-safe

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    // error จาก zod → 400
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/patients/:id
export async function getPatientById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid Patient_Id (must be a number)" });
  }

  try {
    const { data, error } = await supabase
      .from("Patients")
      .select("*")
      .eq("Patient_Id", idNum)
      .single()
      .returns<Patient>();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/patients/:id
export async function deletePatientById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid Patient_Id (must be a number)" });
  }

  try {
    const { error } = await supabase
      .from("Patients")
      .delete()
      .eq("Patient_Id", idNum);

    if (error) {
      console.error("[SUPABASE ERROR] DELETE /api/patients/:id:", error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ ok: true, message: `Patient ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/patients/:id
export async function updatePatientById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid Patient_Id (must be a number)" });
  }

  try {
    // ✅ validate fields ที่ส่งมาแก้
    const patch = updatePatientSchema.parse(req.body) as UpdatePatient;

    const { data, error } = await supabase
      .from("Patients")
      .update(patch)
      .eq("Patient_Id", idNum)
      .select("*")
      .single()
      .returns<Patient>();

    if (error) {
      console.error("[SUPABASE ERROR] PUT /api/patients/:id:", error);
      return res.status(400).json({ error: error.message });
    }
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
