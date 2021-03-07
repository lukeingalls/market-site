import { NextApiRequest, NextApiResponse } from "next";
import { getArticleByAuthor } from "../../lib/db/queries";
import { auth } from "../../lib/firebase/firebase-admin";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await auth.verifyIdToken(req.headers.token as string);
    const articles = await getArticleByAuthor(user.uid);

    const respArticles = articles.map((article) => {
      return article.get({ plain: true });
    });

    res.status(200).send(respArticles);
  } catch (error) {
    res.status(403).send({});
  }
};
