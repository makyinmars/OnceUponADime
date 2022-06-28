import jwt from "jsonwebtoken";

export const generateToken = (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });
};
