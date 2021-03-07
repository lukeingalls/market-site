import { Col, Container, Row } from "react-bootstrap";
import ArticleCard from "./Card/Card";
import * as styles from "../../../styles/Article/CardDeck/CardDeck.module.scss";

export default function ArticleCardDeck({ Articles }) {
  return (
    <Container>
      <Row className={`${styles["article-card__deck"]}`}>
        {Articles.map((article) => {
          return (
            <Col
              key={article["idArticles"]}
              className={`${styles["article-card"]}`}
              xl={4}
              md={6}
              xs={12}
            >
              <ArticleCard article={article} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
