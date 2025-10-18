import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../../supabaseClient";
import { newStaffSchema, updateStaffSchema } from "../../schemas/user/staff.schema";
import type { StaffPublic } from "../../types/user/staff";

// ไม่คืน password
const PUBLIC_COLUMNS =
  "Staff_Id, Fname, Lname, Role, email, Hospital_Name"; // 👈 เพิ่ม Hospital_Name

// GET /api/staff
export async function getStaff(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("Staff")
      .select(PUBLIC_COLUMNS)
      .order("Staff_Id", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data as StaffPublic[]);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/staff/:id
export async function getStaffById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid Staff_Id" });

  try {
    const { data, error } = await supabase
      .from("Staff")
      .select(PUBLIC_COLUMNS)
      .eq("Staff_Id", id)
      .single();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(data as StaffPublic);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/staff
export async function createStaff(req: Request, res: Response) {
  try {
    const payload = newStaffSchema.parse(req.body);

    // กัน email ซ้ำ
    const { data: existed, error: qErr } = await supabase
      .from("Staff")
      .select("Staff_Id")
      .eq("email", payload.email)
      .maybeSingle();
    if (qErr) return res.status(500).json({ error: qErr.message });
    if (existed) return res.status(400).json({ error: "Email already in use" });

    const hashed = await bcrypt.hash(payload.password, 10);

    const { data, error } = await supabase
      .from("Staff")
      .insert({ ...payload, password: hashed })
      .select(PUBLIC_COLUMNS)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data as StaffPublic);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/staff/:id
export async function updateStaffById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid Staff_Id" });

  try {
    const patch = updateStaffSchema.parse(req.body);
    const toUpdate: Record<string, any> = { ...patch };

    if (patch.password) {
      toUpdate.password = await bcrypt.hash(patch.password, 10);
    }

    const { data, error } = await supabase
      .from("Staff")
      .update(toUpdate)
      .eq("Staff_Id", id)
      .select(PUBLIC_COLUMNS)
      .single();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data as StaffPublic);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/staff/:id
export async function deleteStaffById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid Staff_Id" });

  try {
    const { error } = await supabase.from("Staff").delete().eq("Staff_Id", id);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `Staff ${id} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
