// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TokenPayload {
  userId: number;
  role: number;
}

export interface AuthRequest extends Request {
  user?:TokenPayload; 
}

export const verifyToken = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  console.log("AUTH HEADER 👉", authHeader);
  if(!authHeader) {
    res.status(401).json({ message: "Ha ocurrido un errorsote" });
    return;
  }

  const token = authHeader.split(" ")[1];

  console.log("TOKEN 👉", token);

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado." });
  }

  try {
    const decoded = jwt.verify(
      token, 
      process.env.SECRET_KEY || 'pacoeltaco'
    );

    console.log("DECODED TOKEN 👉", decoded);


    if(!isTokenPayload(decoded)) {
      return res.status(401).json({ message: "Acceso denegado." });
    }

    req.user = decoded;
    next();
  } catch (error) {
     return res.status(401).json({ message: "Ocurrio un errorson" });
  }
};


function isTokenPayload(
  decoded: string | jwt.JwtPayload): 
  decoded is TokenPayload {
  return (typeof decoded === "object" && 
         decoded !== null &&
         typeof (decoded as any).userId === "number" &&
         typeof (decoded as any).role === "number");
}

