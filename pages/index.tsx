import { Container } from "react-bootstrap";
import { getCategoriesIndex, newArticles } from "../lib/articles";
import ArticleCardDeck from "../components/Article/CardDeck/CardDeck";
import { Article, Category } from "@prisma/client";
import CategoryComponent from "../components/Category/Category";
// import ArticleHighlight from "../Article/ArticleHighlight/ArticleHighlight";

interface IndexProps {
  recentArticles: Article[];
  popularArticles?: Article[];
  categories: Category[];
}

type IndexStaticProps = [Article[], Article[], Category[]];

export const getStaticProps = async () => {
  const [recentArticles, _, categories]: IndexStaticProps = await Promise.all([
    (async () => {
      return await newArticles();
    })(),
    (async () => {
      return undefined;
    })(),
    (async () => {
      return await getCategoriesIndex();
    })(),
  ]);
  return {
    props: {
      recentArticles,
      categories,
    },
    // Rebuild homepage every hour
    revalidate: 60 * 60,
  };
};

export default function Index({
  recentArticles,
  popularArticles,
  categories,
}: IndexProps) {
  return (
    <Container>
      {/* {topArticle && <ArticleHighlight Article={topArticle} />} */}
      {popularArticles && (
        <Container>
          <h3 className="text-center my-4">Popular Articles</h3>
          {/* <ArticleCardDeck Articles={popularArticles} /> */}
        </Container>
      )}
      {recentArticles && (
        <Container>
          <h3 className="text-center my-4">New Articles</h3>
          <ArticleCardDeck Articles={recentArticles} />
        </Container>
      )}
      {categories && (
        <Container>
          <h3 className="text-center my-4">Article Categories</h3>
          {/* <CategoryComponent categories={categories} /> */}
        </Container>
      )}
    </Container>
  );
}
