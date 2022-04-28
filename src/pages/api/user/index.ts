import type { NextApiResponse, NextApiRequest } from "next";

import UserModel from "@/server/models/userModel";
import connectDB from "@/server/database/db";
import { generateToken } from "@/server/utils/generateToken";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Get all Users
    const users = await UserModel.find();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email, password } = req.body;
    const user = new UserModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: generateToken(user._id),
    });
  }
};

export default connectDB(handler);
