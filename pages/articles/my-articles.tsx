import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Loading from "../../components/Loading";
import { useAuth } from "../../contexts/Auth";
import { ArticleAttributes } from "../../lib/db/models";
import fetcher from "../../lib/fetcher";
import * as styles from "../../styles/Article/my-article.module.scss";

interface MyArticlesProps {
  className?: string;
}

const MyArticles = ({ className }: MyArticlesProps) => {
  const [articles, setArticles] = useState<ArticleAttributes[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    let mount = true;
    if (token) {
      (async () => {
        const resp = await fetcher("/api/get-my-articles", token);
        if (mount && Array.isArray(resp)) {
          setArticles(resp);
          setLoading(false);
        }
      })();
    }
    return () => {
      mount = false;
    };
  }, [token]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Container className={`${className} pt-3`}>
        <Row className="mb-3 align-items-center">
          <Col>
            <h1>My Articles</h1>
          </Col>
          <Col className="text-right" xs={3}>
            <Button href="/articles/manage/new" variant="info">
              New Article
            </Button>
          </Col>
        </Row>
        {articles ? (
          articles.map((article) => {
            return (
              <Row
                className={`${styles["manage-article"]} border`}
                key={article.idArticles}
              >
                <Col className={`${styles["manage-article--title"]}`}>
                  {article.title}
                </Col>
                <Col className="text-right" xs={2}>
                  {/* <span className="text-muted mr-3">
                    {`Views $`}
                  </span> */}
                  <Button
                    href={`/articles/manage/${article.idArticles}`}
                    variant="info"
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
            );
          })
        ) : (
          <Alert variant="warning">You do not have any articles.</Alert>
        )}
      </Container>
    );
  }
};

export default MyArticles;
