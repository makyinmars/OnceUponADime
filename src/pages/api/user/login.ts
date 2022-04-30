import type { NextApiResponse, NextApiRequest } from "next"

import UserModel from "@/server/models/userModel"
import connectDB from "@/server/database/db"
import { generateToken } from "@/server/utils/generateToken"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })

    if (user && (await user.comparePassword(password))) {
      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        },
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  }
}

export default connectDB(handler)
