import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import {
  newMedTechSchema,
  updateMedTechSchema,
} from "../../schemas/user/medtech.schema";
import type {
  MedTech,
  NewMedTech,
  UpdateMedTech,
  MedTechWithStaff,
} from "../../types/user/medtech";

// 👇 แก้ให้ตรงชื่อ FK จริงถ้าไม่ใช่ชื่อนี้
const FK_NAME = "medtech_staff_fk";

// normalize: ถ้า Staff เป็น array ให้หยิบตัวแรก
function pickSingleStaff(row: any) {
  if (!row) return row;
  const staff = Array.isArray(row?.Staff) ? (row.Staff[0] ?? null) : (row?.Staff ?? null);
  return { ...row, Staff: staff };
}

/** GET /api/medtech */
export async function getMedTechs(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("MedTech")
      .select("*")
      .order("MedTech_Id", { ascending: true })
      .returns<MedTech[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

/** GET /api/medtech/with-staff */
export async function getMedTechsWithStaff(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("MedTech")
      .select(`
        MedTech_Id,
        Staff_Id,
        Staff:${FK_NAME} (
          Staff_Id,
          Fname,
          Lname,
          email,
          Role
        )
      `);

    if (error) return res.status(500).json({ error: error.message });

    const normalized = (data ?? []).map(pickSingleStaff);
    return res.json(normalized as MedTechWithStaff[]);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

/** GET /api/medtech/:id */
export async function getMedTechById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid MedTech_Id (must be a number)" });
  }

  try {
    const { data, error } = await supabase
      .from("MedTech")
      .select(`
        MedTech_Id,
        Staff_Id,
        Staff:${FK_NAME} (
          Staff_Id,
          Fname,
          Lname,
          email,
          Role
        )
      `)
      .eq("MedTech_Id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data)  return res.status(404).json({ error: "MedTech not found" });

    return res.json(pickSingleStaff(data) as MedTechWithStaff);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

/** POST /api/medtech */
export async function createMedTech(req: Request, res: Response) {
  try {
    const payload = newMedTechSchema.parse(req.body) as NewMedTech;

    const { data, error } = await supabase
      .from("MedTech")
      .insert(payload)
      .select("*")
      .single()
      .returns<MedTech>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

/** PUT /api/medtech/:id */
export async function updateMedTechById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid MedTech_Id (must be a number)" });
  }

  try {
    const patch = updateMedTechSchema.parse(req.body) as UpdateMedTech;

    const { data, error } = await supabase
      .from("MedTech")
      .update(patch)
      .eq("MedTech_Id", id)
      .select("*")
      .single()
      .returns<MedTech>();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

/** DELETE /api/medtech/:id */
export async function deleteMedTechById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid MedTech_Id (must be a number)" });
  }

  try {
    const { error } = await supabase
      .from("MedTech")
      .delete()
      .eq("MedTech_Id", id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `MedTech ${id} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
