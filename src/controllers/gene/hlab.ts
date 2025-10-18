import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { HLAB, NewHLAB, UpdateHLAB } from "../../types/gene/hlab";
import { newHLABSchema, updateHLABSchema } from "../../schemas/gene/hlab.schema";

// GET /api/hlab
export async function getHLAB(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("HLA_B")
      .select("*")
      .limit(100)
      .returns<HLAB[]>();

    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/hlab/:id
export async function getHLABById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid HLA_B_Id (must be a number)" });
  }

  try {
    const { data, error } = await supabase
      .from("HLA_B")
      .select("*")
      .eq("HLA_B_Id", idNum)
      .single()
      .returns<HLAB>();

    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/hlab
export async function createHLAB(req: Request, res: Response) {
  try {
    const payload = newHLABSchema.parse(req.body) as NewHLAB;
    const { data, error } = await supabase
      .from("HLA_B")
      .insert(payload)
      .select("*")
      .single()
      .returns<HLAB>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/hlab/:id
export async function updateHLABById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid HLA_B_Id (must be a number)" });
  }

  try {
    const patch = updateHLABSchema.parse(req.body) as UpdateHLAB;
    const { data, error } = await supabase
      .from("HLA_B")
      .update(patch)
      .eq("HLA_B_Id", idNum)
      .select("*")
      .single()
      .returns<HLAB>();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/hlab/:id
export async function deleteHLABById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid HLA_B_Id (must be a number)" });
  }

  try {
    const { error } = await supabase.from("HLA_B").delete().eq("HLA_B_Id", idNum);
    if (error) return res.status(500).json({ error: error.message });

    return res.json({ ok: true, message: `HLA_B ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
