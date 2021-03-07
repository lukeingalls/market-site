import { Container } from "react-bootstrap";
import { newArticles } from "../lib/articles/new-articles";
import ArticleCardDeck from "../components/Article/CardDeck/CardDeck";
import { ArticleAttributes } from "../lib/db/models";
// import ArticleHighlight from "../Article/ArticleHighlight/ArticleHighlight";

interface IndexProps {
  recentArticles: ArticleAttributes[];
  popularArticles: ArticleAttributes[];
}

export const getStaticProps = async () => {
  const recentArticles: ArticleAttributes[] = await newArticles();

  return {
    props: {
      recentArticles,
    },
    // Rebuild homepage every hour
    revalidate: 60 * 60,
  };
};

export default function Index({ recentArticles, popularArticles }: IndexProps) {
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
    </Container>
  );
}
