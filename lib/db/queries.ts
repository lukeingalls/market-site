import { Article, User } from "./models";

export const getArticle = (id: string) => {
  return Article.findOne({
    where: {
      url: id,
    },
  });
};

export const getArticleById = (id: string) => {
  return Article.findOne({
    where: {
      idArticles: id,
    },
  });
};

export const getArticleByAuthor = (id: string) => {
  return Article.findAll({
    where: {
      authorIdUsers: id,
    },
  });
};

export const getUser = (uid: string) => {
  return User.findOne({
    where: {
      idUsers: uid,
    },
  });
};

export const getAllPublishedArticles = () => {
  return Article.findAll({
    attributes: ["url"],
    where: {
      publish: true,
    },
  });
};

export const getNewPublishedArticles = (limit: number = 5) => {
  return Article.findAll({
    where: {
      publish: true,
    },
    order: [["createdAt", "DESC"]],
    limit,
  });
};
