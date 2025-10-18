import { Request, Response, NextFunction } from "express";

export function requireRole(roles: string | string[]) {
  const allow = Array.isArray(roles) ? roles : [roles];
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role?.toLowerCase();
    if (!role) return res.status(401).json({ error: "Unauthenticated" });
    if (!allow.includes(role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }
    next();
  };
}
