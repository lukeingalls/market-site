import {
  Article,
  ArticleAttributes,
  Author,
  createURL,
  User,
} from "../../lib/db/models";
import { auth } from "../../lib/firebase/firebase-admin";
import { getUser } from "../../lib/db/queries";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const user = await auth.verifyIdToken(req.headers.token as string);
      if (user?.uid) {
        Article.create({
          ...(req.body as ArticleAttributes),
          url: createURL(req.body.title),
          // TODO: Fix this
          // @ts-ignore
          authorIdUsers: user.uid,
        })
          .then((article) => {
            res
              .status(200)
              .json({ success: true, content: JSON.stringify(article) });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({
              success: false,
              error,
            });
          });
      }
    } catch (error) {
      res.status(500).json({ success: false });
    }
  } else {
    res.status(400).json({});
  }
};
