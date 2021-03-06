import { Button, Card } from "react-bootstrap";
import * as styles from "../../../../styles/Article/CardDeck/Card/Card.module.scss";
import ReactMarkdown from "react-markdown";
import { getTimeString } from "../../../../lib/time";
import { Article } from "@prisma/client";
import gfm from "remark-gfm";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const timeString = getTimeString(article.createdAt);

  return (
    <Card>
      {/* <Card.Img variant="top" /> */}
      <Card.Body className={`${styles["article-card__body"]}`}>
        <Card.Title className={`${styles["article-card__title"]}`}>
          {article.title}
        </Card.Title>
        {article.subtitle && (
          <Card.Title className="article-card__subtitle">
            {article.subtitle}
          </Card.Title>
        )}
        <hr />
        <Card.Text
          children={article.body.slice(0, 400)}
          as={ReactMarkdown}
          plugins={[gfm]}
          className={`mt-3 ${styles["article-card__text"]}`}
        />
      </Card.Body>
      <Card.Footer className={`${styles["article-card__footer"]}`}>
        <p className="text-muted">Posted {timeString}</p>
        <Button href={`articles/${article.url}`} variant="outline-info">
          Read More
        </Button>
      </Card.Footer>
    </Card>
  );
}
