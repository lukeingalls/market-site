import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getArticleById } from "../../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const id = Number(JSON.parse(req.body).id);
      const article = await getArticleById(id);
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
