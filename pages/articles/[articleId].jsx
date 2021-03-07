import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Disclaimer from "../../components/Article/Disclaimer/Disclaimer";
import Reactions from "../../components/Article/Reactions/Reactions";
import { getAllPostIds, getPostData } from "../../lib/articles/articles";
import Head from "next/head";

export const getStaticPaths = async () => {
  try {
    const paths = await getAllPostIds();

    return {
      paths,
      fallback: false,
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
      ...postData,
    },
  };
};

const Article = ({ title, subtitle, body }) => {
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
            {/*
                { author && 
                    <Byline
                        bio={author.data().bio}
                        displayName={author.data().displayName}
                        title={author.data().title}
                        timestamp={String(doc.data().created.toDate())}
                    />
                } */}
            <ReactMarkdown children={body} />
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

export default Article;
