import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { NewVKORC1, UpdateVKORC1, VKORC1 } from "../../types/gene/vkorc1";
import { newVKORC1Schema, updateVKORC1Schema } from "../../schemas/gene/vkorc1.schema";

// GET /api/vkorc1
export async function getVKORC1(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("VKORC1")
      .select("*")
      .limit(100)
      .returns<VKORC1[]>();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/vkorc1/:id
export async function getVKORC1ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid VKORC1_Id (must be a number)" });
  }
  try {
    const { data, error } = await supabase
      .from("VKORC1")
      .select("*")
      .eq("VKORC1_Id", idNum)
      .single()
      .returns<VKORC1>();
    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/vkorc1
export async function createVKORC1(req: Request, res: Response) {
  try {
    const payload = newVKORC1Schema.parse(req.body) as NewVKORC1;
    const { data, error } = await supabase
      .from("VKORC1")
      .insert(payload)
      .select("*")
      .single()
      .returns<VKORC1>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/vkorc1/:id
export async function updateVKORC1ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid VKORC1_Id (must be a number)" });
  }
  try {
    const patch = updateVKORC1Schema.parse(req.body) as UpdateVKORC1;
    const { data, error } = await supabase
      .from("VKORC1")
      .update(patch)
      .eq("VKORC1_Id", idNum)
      .select("*")
      .single()
      .returns<VKORC1>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") {
      return res.status(400).json({ error: e.flatten() });
    }
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/vkorc1/:id
export async function deleteVKORC1ById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid VKORC1_Id (must be a number)" });
  }
  try {
    const { error } = await supabase
      .from("VKORC1")
      .delete()
      .eq("VKORC1_Id", idNum);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `VKORC1 ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
