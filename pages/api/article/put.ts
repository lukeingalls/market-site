import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { putArticle } from "../../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const articleData = JSON.parse(req.body);
      const article = await putArticle(articleData, session.user as User);
      res.status(200).json({ ...article });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(401);
  }
  res.end();
};
