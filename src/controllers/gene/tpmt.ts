import { Request, Response } from "express";
import { supabase } from "../../supabaseClient";
import { NewTPMT, TPMT, UpdateTPMT } from "../../types/gene/tpmt";
import { newTPMTSchema, updateTPMTSchema } from "../../schemas/gene/tpmt.schema";

// GET /api/tpmt
export async function getTPMT(_req: Request, res: Response) {
  try {
    const { data, error } = await supabase
      .from("TPMT")
      .select("*")
      .limit(100)
      .returns<TPMT[]>();
    if (error) return res.status(500).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// GET /api/tpmt/:id
export async function getTPMTById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid TPMT_Id (must be a number)" });
  }
  try {
    const { data, error } = await supabase
      .from("TPMT")
      .select("*")
      .eq("TPMT_Id", idNum)
      .single()
      .returns<TPMT>();
    if (error) return res.status(404).json({ error: error.message });
    return res.json(data);
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// POST /api/tpmt
export async function createTPMT(req: Request, res: Response) {
  try {
    const payload = newTPMTSchema.parse(req.body) as NewTPMT;
    const { data, error } = await supabase
      .from("TPMT")
      .insert(payload)
      .select("*")
      .single()
      .returns<TPMT>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// PUT /api/tpmt/:id
export async function updateTPMTById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid TPMT_Id (must be a number)" });
  }
  try {
    const patch = updateTPMTSchema.parse(req.body) as UpdateTPMT;
    const { data, error } = await supabase
      .from("TPMT")
      .update(patch)
      .eq("TPMT_Id", idNum)
      .select("*")
      .single()
      .returns<TPMT>();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  } catch (e: any) {
    if (e?.name === "ZodError") return res.status(400).json({ error: e.flatten() });
    return res.status(500).json({ error: String(e?.message || e) });
  }
}

// DELETE /api/tpmt/:id
export async function deleteTPMTById(req: Request, res: Response) {
  const idNum = Number(req.params.id);
  if (!Number.isFinite(idNum)) {
    return res.status(400).json({ error: "Invalid TPMT_Id (must be a number)" });
  }
  try {
    const { error } = await supabase.from("TPMT").delete().eq("TPMT_Id", idNum);
    if (error) return res.status(500).json({ error: error.message });
    return res.json({ ok: true, message: `TPMT ${idNum} deleted` });
  } catch (e: any) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
