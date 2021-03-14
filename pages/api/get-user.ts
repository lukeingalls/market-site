import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // try {
  //   const user = await auth.verifyIdToken(req.headers.token as string);
  //   if (user?.uid) {
  //     const userData = await getUser(user.uid);
  //     res.status(200).json(userData);
  //   } else {
  //     res.status(400).json({ error: "Invalid auth token" });
  //   }
  // } catch (error) {
  //   res.status(500).json({ error });
  // }
  res.status(500);
};
