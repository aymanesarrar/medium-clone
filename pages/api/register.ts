import { NextApiRequest, NextApiResponse } from "next";

export default function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  res.json({ status: "ok" });
}
