import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as any;
    (req as any).user = { _id: decoded.id };
    next();
  } catch {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export default protect;
