import {
  getAllPublishedArticles,
  getArticle,
  getArticleCategories,
} from "../db/queries";

export const getAllPostIds = async () => {
  const articles = await getAllPublishedArticles();

  return articles.map((article) => {
    return {
      params: {
        articleId: article.url,
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const article = await getArticle(id);
  const categories = await getArticleCategories(id);

  return {
    article,
    categories,
  };
};
