import { getCategories, getNewPublishedArticles } from "../db/queries";

export const getCategoriesIndex = async () => {
  return await getCategories();
};

export const newArticles = async () => {
  return await getNewPublishedArticles();
};
