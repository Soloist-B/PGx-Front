import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { newAdminSchema, updateAdminSchema } from "../../schemas/user/admin.schema";
import type { Admin, NewAdmin, UpdateAdmin, AdminWithStaff } from "../../types/user/admin";

// GET /api/admin
export async function getAdmins(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("Admin")
      .select("*")
      .order("Admin_Id", { ascending: true })
      .returns<Admin[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/admin/with-staff — รวมข้อมูลบุคคลจาก Staff
export async function getAdminsWithStaff(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("Admin")
      .select(`
        Admin_Id,
        Staff_Id,
        Staff:admin_staff_fk (
          Staff_Id,
          Fname,
          Lname,
          email,
          Role
        )
      `)
      .returns<AdminWithStaff[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/admin/:id — แถวเดียว + รวม Staff
export async function getAdminById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid Admin_Id (must be a number)" });
  }

  try {
    const { data, error } = await supabase
      .from("Admin")
      .select(`
        Admin_Id,
        Staff_Id,
        Staff:admin_staff_fk (
          Staff_Id,
          Fname,
          Lname,
          email,
          Role
        )
      `)
      .eq("Admin_Id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!data)  return res.status(404).json({ error: "Admin not found" });

    // 🧽 normalize: ถ้าเป็น array ให้หยิบตัวแรก, ถ้าไม่มีให้เป็น null
    const staff =
      Array.isArray((data as any).Staff)
        ? ((data as any).Staff[0] ?? null)
        : (data as any).Staff ?? null;

    const payload = { ...data, Staff: staff };
    return res.json(payload); // ตอนนี้ shape ตรงกับ AdminWithStaff
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}


// (ถ้าจะคง CRUD ไว้ด้วยก็ตามนี้)
export async function createAdmin(req: Request, res: Response) {
  try {
    const payload = newAdminSchema.parse(req.body) as NewAdmin;

    const { data, error } = await supabase
      .from("Admin")
      .insert(payload)
      .select("*")
      .single()
      .returns<Admin>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

export async function updateAdminById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid Admin_Id (must be a number)" });
  }
  try {
    const patch = updateAdminSchema.parse(req.body) as UpdateAdmin;

    const { data, error } = await supabase
      .from("Admin")
      .update(patch)
      .eq("Admin_Id", id)
      .select("*")
      .single()
      .returns<Admin>();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

export async function deleteAdminById(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid Admin_Id (must be a number)" });
  }
  try {
    const { error } = await supabase
      .from("Admin")
      .delete()
      .eq("Admin_Id", id);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `Admin ${id} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
