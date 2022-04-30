import type { NextApiResponse, NextApiRequest } from "next"

import UserModel from "@/server/models/userModel"
import connectDB from "@/server/database/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Get all Users
    const users = await UserModel.find()
    res.status(200).json(users)
  }
}

export default connectDB(handler)
