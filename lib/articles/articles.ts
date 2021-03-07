import { getAllPublishedArticles, getArticle, getUser } from "../db/queries";

export const getAllPostIds = async () => {
  const articles = await getAllPublishedArticles();
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

export const getPostData = async (id: string) => {
  // Change this to be a subquery
  const article = await getArticle(id);
  const user = await getUser(article.getDataValue("authorIdUsers"));

  return {
    article: {
      ...article.get({ plain: true }),
      createdAt: article.getDataValue("createdAt").toString(),
      updatedAt: article.getDataValue("updatedAt").toString(),
    },
    user: {
      ...user.get({ plain: true }),
      createdAt: user.getDataValue("createdAt").toString(),
      updatedAt: user.getDataValue("updatedAt").toString(),
    },
  };
};
