import type { NextApiResponse, NextApiRequest } from "next"

import UserModel from "@/server/models/userModel"
import connectDB from "@/server/database/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await UserModel.find()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default connectDB(handler)
