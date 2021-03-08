import { NextApiRequest, NextApiResponse } from "next";
import authRequest from "../../../lib/api/authRequest";
import { Article } from "../../../lib/db/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  authRequest(req, res, () => {
    Article.update(req.body, {
      where: {
        idArticles: req.body.idArticles,
      },
    });
    res.status(200).json({ success: true });
  });
};
