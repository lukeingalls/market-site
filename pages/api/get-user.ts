import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebase/firebase-admin";
import { getUser } from "../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.headers.token);
    const user = await auth.verifyIdToken(req.headers.token as string);
    if (user?.uid) {
      const userData = await getUser(user.uid);
      res.status(200).json(userData);
    } else {
      res.status(400).json({ error: "Invalid auth token" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
