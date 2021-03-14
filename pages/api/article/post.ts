import { Article } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { postArticle } from "../../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const articleData = JSON.parse(req.body) as Article;
      // @ts-ignore
      if (session.user.id === articleData.authorId) {
        const article = await postArticle(articleData);
        res.status(200).json({ ...article });
      } else {
        throw new Error("Trying to alter non-owned article");
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(401);
  }
  res.end();
};
