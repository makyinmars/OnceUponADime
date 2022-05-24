import type { NextApiResponse, NextApiRequest } from "next"

import connectDB from "@/server/database/db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    // Get all Users
  }
}

export default connectDB(handler)
