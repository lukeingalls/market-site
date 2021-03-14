import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { getArticlesByAuthor } from "../../../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    try {
      const articles = await getArticlesByAuthor(session.user as User);
      res.status(200).json(JSON.stringify(articles));
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  } else {
    res.status(401);
  }
  res.end();
};
