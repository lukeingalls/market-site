import { getAllPublishedArticles, getArticle } from "../db/queries";

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

  return {
    article: {
      ...article,
    },
  };
};
