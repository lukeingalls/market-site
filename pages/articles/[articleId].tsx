import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Disclaimer from "../../components/Article/Disclaimer/Disclaimer";
import Reactions from "../../components/Article/Reactions/Reactions";
import Byline from "../../components/Article/Byline/Byline";
import { getAllPostIds, getPostData } from "../../lib/articles/articles";
import Head from "next/head";
import { Article, User } from "@prisma/client";
import gfm from "remark-gfm";

export const getStaticPaths = async () => {
  try {
    const paths = await getAllPostIds();

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.articleId);

  return {
    props: {
      article: postData.article,
      user: postData.article.author,
    },
  };
};

interface ArticleProps {
  article: Article;
  user: User;
}

const ArticleComponent = ({ article, user }: ArticleProps) => {
  const { title, subtitle, body } = article || {
    title: "ERROR: title not found",
    subtitle: undefined,
    body: "ERROR: article was not retrieved",
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Container className="article">
        <Row>
          <Col
            md={{
              span: 2,
              order: "first",
            }}
            xs={{
              span: 12,
              order: "last",
            }}
          >
            <Reactions />
          </Col>
          <Col md="9" xs="12">
            <h1 className="article--title"> {title} </h1>
            {subtitle && <h2 className="article--subtitle"> {subtitle}</h2>}

            {user && <Byline user={user} createdAt={article.createdAt} />}
            <ReactMarkdown plugins={[gfm]}>{body}</ReactMarkdown>
          </Col>
          <Col
            md={{
              span: 1,
            }}
            xs={false}
          />
        </Row>
        <hr />
        <Disclaimer />
      </Container>
    </>
  );
};

export default ArticleComponent;
