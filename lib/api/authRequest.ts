import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../firebase/firebase-admin";

export default async function authRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: Function
) {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    if (user) {
      await handler(req, res);
    } else {
      res.status(401).json({});
    }
  } catch (error) {
    res.status(500).json({});
  }
}
