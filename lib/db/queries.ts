import { Article, User } from "@prisma/client";
import { randomBytes } from "crypto";
import prisma from "./prisma";

const createURL = (title: string) => {
  return (
    title
      .replace(/ /g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .slice(0, 50) +
    "-" +
    randomBytes(5).toString("hex")
  );
};

export async function getArticle(url: string) {
  return await prisma.article.findFirst({
    include: {
      author: {
        select: {
          bio: true,
          image: true,
          name: true,
          title: true,
        },
      },
    },
    where: {
      url,
    },
  });
}

export async function getArticlesByAuthor(user: User) {
  return await prisma.article.findMany({
    where: {
      authorId: user.id,
    },
  });
}

export async function getArticleById(id: number) {
  return await prisma.article.findFirst({
    where: {
      id,
    },
  });
}

export async function getAllPublishedArticles() {
  return await prisma.article.findMany({
    select: {
      url: true,
    },
    where: {
      published: true,
    },
  });
}

export async function getNewPublishedArticles(limit: number = 5) {
  return await prisma.article.findMany({
    where: {
      published: true,
    },
    take: limit,
  });
}

export async function getArticleReactions(id: number) {
  return await prisma.reaction.groupBy({
    by: ["type"],
    where: {
      articleId: id,
    },
    count: {
      _all: true,
    },
  });
}

export async function getMyReaction(userId: number, articleId: number) {
  return await prisma.reaction.findFirst({
    select: {
      type: true,
    },
    where: {
      userId: userId,
      articleId: articleId,
    },
  });
}

export function getViews(articleId: number) {
  return prisma.view.aggregate({
    count: {
      _all: true,
    },
    where: {
      articleId,
    },
  });
}

export async function putArticle(article: Article, user: User) {
  return await prisma.article.create({
    data: {
      ...article,
      url: createURL(article.title),
      authorId: user.id,
    },
  });
}

export async function putView(ip: string, articleId: number) {
  return await prisma.view.upsert({
    create: {
      ip,
      articleId,
    },
    update: {
      count: {
        increment: 1,
      },
    },
    where: {
      ip_articleId: {
        articleId,
        ip,
      },
    },
  });
}

export async function postArticle(article: Article) {
  return await prisma.article.update({
    where: {
      id: article.id,
    },
    data: {
      ...article,
    },
  });
}

export async function postUser(user: User) {
  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...user,
    },
  });
}

export async function postReaction(
  type: string,
  articleId: number,
  userId: number
) {
  return await prisma.reaction.upsert({
    create: {
      type,
      articleId,
      userId,
    },
    update: {
      type,
    },
    where: {
      articleId_userId: {
        articleId,
        userId,
      },
    },
  });
}
