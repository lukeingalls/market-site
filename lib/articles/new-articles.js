import { Article } from "../db/models.ts";

export const newArticles = async () => {
  const articles = await Article.findAll({
    where: {
      publish: false,
    },
    order: [["createdAt", "DESC"]],
    limit: 5,
  });
  return articles?.map((article) => {
    return {
      ...article.dataValues,
      createdAt: article.dataValues["createdAt"].toString(),
      updatedAt: article.dataValues["createdAt"].toString(),
      // createdAt: new Date(article.dataValues["createdAt"]).toString(),
      // updatedAt: new Date(article.dataValues["createdAt"]).toString(),
    };
  });
};
