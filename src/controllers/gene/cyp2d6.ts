import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { CYP2D6, NewCYP2D6, UpdateCYP2D6 } from "../../types/gene/cyp2d6";
import { newCYP2D6Schema, updateCYP2D6Schema } from "../../schemas/gene/cyp2d6.schema";

// GET /api/cyp2d6
export async function getCYP2D6(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("CYP2D6")
      .select("*")
      .limit(100)
      .returns<CYP2D6[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/cyp2d6/:id
export async function getCYP2D6ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid 2D6_Id (must be a number)" });
  }
  try {
    const { data, error } = await supabase
      .from("CYP2D6")
      .select("*")
      .eq("2D6_Id", idNum)   // 👈 ใช้ชื่อคอลัมน์เป็นสตริง
      .single()
      .returns<CYP2D6>();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/cyp2d6
export async function createCYP2D6(req: Request, res: Response) {
  try {
    const payload = newCYP2D6Schema.parse(req.body) as NewCYP2D6;
    const { data, error } = await supabase
      .from("CYP2D6")
      .insert(payload)
      .select("*")
      .single()
      .returns<CYP2D6>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/cyp2d6/:id
export async function updateCYP2D6ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid 2D6_Id (must be a number)" });
  }
  try {
    const patch = updateCYP2D6Schema.parse(req.body) as UpdateCYP2D6;
    const { data, error } = await supabase
      .from("CYP2D6")
      .update(patch)
      .eq("2D6_Id", idNum)
      .select("*")
      .single()
      .returns<CYP2D6>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/cyp2d6/:id
export async function deleteCYP2D6ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid 2D6_Id (must be a number)" });
  }
  try {
    const { error } = await supabase
      .from("CYP2D6")
      .delete()
      .eq("2D6_Id", idNum);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `CYP2D6 ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
