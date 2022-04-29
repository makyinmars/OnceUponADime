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
    const newUser = new UserModel({
      name,
      email,
      password,
    });
    await newUser.save();
    res.status(200).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        admin: newUser.admin,
      },
      token: generateToken(newUser._id),
    });
  }
};

export default connectDB(handler);
