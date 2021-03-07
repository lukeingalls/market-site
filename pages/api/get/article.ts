import { NextApiRequest, NextApiResponse } from "next";
import authRequest from "../../../lib/api/authRequest";
import { getArticleById } from "../../../lib/db/queries";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  authRequest(req, res, async () => {
    try {
      const articleId = JSON.parse(req.body);
      const article = await getArticleById(articleId.toString());
      res.status(200).json(article.get({ plain: true }));
    } catch (error) {
      res.status(500).json(JSON.stringify(error));
    }
  });
};
