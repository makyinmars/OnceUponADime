import mongoose from "mongoose";
import type { NextApiResponse, NextApiRequest, NextApiHandler } from "next";

const connectDB =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const uri = process.env.MONGO_URI as string;
      await mongoose.connect(uri);
      console.log("MongoDB connected");
      return handler(req, res);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

export default connectDB;
