import connectDB from "@/server/database/db";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const uri = process.env.MONGO_URI as string;
    await connectDB(uri);
    res.status(200).json({ message: "MongoDB connected" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
