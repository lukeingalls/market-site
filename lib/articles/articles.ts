import { Article } from "../db/models";

export const getAllPostIds = async () => {
  const articles = await Article.findAll({
    attributes: ["url"],
  });

  return articles.map((article) => {
    if (article?.getDataValue("url")) {
      return {
        params: {
          articleId: article.getDataValue("url"),
        },
      };
    }
  });
};

export const getPostData = async (id) => {
  const article = await Article.findOne({
    where: {
      url: id,
    },
  });

  return {
    title: article.getDataValue("title"),
    subtitle: article.getDataValue("subtitle"),
    body: article.getDataValue("body"),
  };
};
