import { getNewPublishedArticles } from "../db/queries";

export const newArticles = async () => {
  const articles = await getNewPublishedArticles();
  return articles;
};
