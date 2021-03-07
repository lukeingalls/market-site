import { Article } from "../../lib/db/models.ts";
import { randomBytes } from "crypto";

export default (req, res) => {
  if (req.method === "POST") {
    let articleReceived;
    try {
      articleReceived = JSON.parse(req.body);
    } catch (error) {
      articleReceived = {};
    }
    Article.create({
      ...articleReceived,
      url:
        articleReceived?.title
          ?.replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-]/g, "")
          .slice(0, 50) +
        "-" +
        randomBytes(5).toString("hex"),
    })
      .then((article) => {
        res.json({ success: true, content: JSON.stringify(article) });
      })
      .catch((error) => {
        res.json({
          success: false,
          error,
        });
      });
  } else {
    res.status(400).json({});
  }
};
