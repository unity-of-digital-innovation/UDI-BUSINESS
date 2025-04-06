import { Request, Response, NextFunction } from "express";
import { compare } from "bcryptjs";
import { storage } from "./storage";

export const authenticateUser = async (username: string, password: string) => {
  const user = await storage.getUserByUsername(username);
  if (!user) return null;
  
  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) return null;
  
  return user;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const user = await storage.getUser(req.session.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }
  
  next();
};
