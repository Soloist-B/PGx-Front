import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { CYP2C9, NewCYP2C9, UpdateCYP2C9 } from "../../types/gene/cyp2c9";
import { newCYP2C9Schema, updateCYP2C9Schema } from "../../schemas/gene/cyp2c9.schema";

// GET /api/cyp2c9
export async function getCYP2C9(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("CYP2C9")
      .select("*")
      .limit(100)
      .returns<CYP2C9[]>();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/cyp2c9/:id
export async function getCYP2C9ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP2C9_Id (must be a number)" });
  }
  try {
    const { data, error } = await supabase
      .from("CYP2C9")
      .select("*")
      .eq("CYP2C9_Id", idNum)
      .single()
      .returns<CYP2C9>();
    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/cyp2c9
export async function createCYP2C9(req: Request, res: Response) {
  try {
    const payload = newCYP2C9Schema.parse(req.body) as NewCYP2C9;
    const { data, error } = await supabase
      .from("CYP2C9")
      .insert(payload)
      .select("*")
      .single()
      .returns<CYP2C9>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/cyp2c9/:id
export async function updateCYP2C9ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP2C9_Id (must be a number)" });
  }
  try {
    const patch = updateCYP2C9Schema.parse(req.body) as UpdateCYP2C9;
    const { data, error } = await supabase
      .from("CYP2C9")
      .update(patch)
      .eq("CYP2C9_Id", idNum)
      .select("*")
      .single()
      .returns<CYP2C9>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/cyp2c9/:id
export async function deleteCYP2C9ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP2C9_Id (must be a number)" });
  }
  try {
    const { error } = await supabase.from("CYP2C9").delete().eq("CYP2C9_Id", idNum);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `CYP2C9 ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
