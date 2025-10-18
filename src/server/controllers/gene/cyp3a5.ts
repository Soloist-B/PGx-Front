import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { CYP3A5, NewCYP3A5, UpdateCYP3A5 } from "../../types/gene/cyp3a5";
import { newCYP3A5Schema, updateCYP3A5Schema } from "../../schemas/gene/cyp3a5.schema";

// GET /api/cyp3a5
export async function getCYP3A5(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("CYP3A5")
      .select("*")
      .limit(100)
      .returns<CYP3A5[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/cyp3a5/:id
export async function getCYP3A5ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP3A5_Id (must be a number)" });
  }
  try {
    const { data, error } = await supabase
      .from("CYP3A5")
      .select("*")
      .eq("CYP3A5_Id", idNum)
      .single()
      .returns<CYP3A5>();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/cyp3a5
export async function createCYP3A5(req: Request, res: Response) {
  try {
    const payload = newCYP3A5Schema.parse(req.body) as NewCYP3A5;

    const { data, error } = await supabase
      .from("CYP3A5")
      .insert(payload)
      .select("*")
      .single()
      .returns<CYP3A5>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/cyp3a5/:id
export async function updateCYP3A5ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP3A5_Id (must be a number)" });
  }
  try {
    const patch = updateCYP3A5Schema.parse(req.body) as UpdateCYP3A5;

    const { data, error } = await supabase
      .from("CYP3A5")
      .update(patch)
      .eq("CYP3A5_Id", idNum)
      .select("*")
      .single()
      .returns<CYP3A5>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/cyp3a5/:id
export async function deleteCYP3A5ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid CYP3A5_Id (must be a number)" });
  }
  try {
    const { error } = await supabase
      .from("CYP3A5")
      .delete()
      .eq("CYP3A5_Id", idNum);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `CYP3A5 ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
