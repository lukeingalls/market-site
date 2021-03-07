import { getNewPublishedArticles } from "../db/queries";

export const newArticles = async () => {
  const articles = await getNewPublishedArticles();
  return articles?.map((article) => {
    return {
      ...article.get({ plain: true }),
      createdAt: article.getDataValue("createdAt").toString(),
      updatedAt: article.getDataValue("updatedAt").toString(),
    };
  });
};
