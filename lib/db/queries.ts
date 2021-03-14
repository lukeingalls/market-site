import { Article, PrismaClient, User } from "@prisma/client";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

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

export async function putArticle(article: Article, user: User) {
  return await prisma.article.create({
    data: {
      ...article,
      url: createURL(article.title),
      authorId: user.id,
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
