import { Col, Container, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Disclaimer from "../../components/Article/Disclaimer/Disclaimer";
import Reactions from "../../components/Article/Reactions/Reactions";
import Byline from "../../components/Article/Byline/Byline";
import { getAllPostIds, getPostData } from "../../lib/articles/articles";
import Head from "next/head";
import { Article, User } from "@prisma/client";
import gfm from "remark-gfm";
import { useEffect, useState } from "react";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";

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

export interface ReactionCount {
  type: string;
  count: {
    _all: number;
  };
}

interface ArticleProps {
  article: Article;
  user: User;
}

interface Data {
  views: number;
  reactions: Array<ReactionCount>;
  myReaction: string;
}

const ArticleComponent = ({ article, user }: ArticleProps) => {
  const { data } = useSWR(`/api/reactions/${article?.id}`, fetcher);
  const { title, subtitle, body } = article || {
    title: "Bountiful Finance Article",
    subtitle: undefined,
    body: undefined,
  };
  const [parsedData, setParsedData] = useState<Data>();
  const [reaction, setReaction] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (data && !data.bodyUsed) {
        const temp = await data.json();
        console.log(temp);
        if (temp?.myReaction) {
          setReaction(temp.myReaction);
        }
        setParsedData(temp);
      } else {
        setParsedData(undefined);
      }
    })();
  }, [data]);

  useEffect(() => {
    let mount = true;
    if (article?.id && parsedData) {
      setLoading(true);
      (async () => {
        try {
          await fetcher(
            "/api/reactions/post",
            "POST",
            JSON.stringify({
              reaction,
              article: article.id,
            })
          );
        } finally {
          if (mount) {
            setLoading(false);
          }
        }
      })();
    }

    return () => {
      mount = false;
    };
  }, [reaction]);

  console.log(loading);

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
            <Reactions
              loading={loading}
              reactionCount={parsedData?.reactions}
              reaction={reaction}
              setReaction={(reaction) => {
                setReaction(reaction);
              }}
            />
          </Col>
          <Col md="9" xs="12">
            <h1 className="article--title"> {title} </h1>
            {subtitle && <h2 className="article--subtitle"> {subtitle}</h2>}
            {parsedData?.views && (
              <p
                className="text-muted"
                style={{
                  fontStyle: "italic",
                }}
              >
                Views {parsedData.views}
              </p>
            )}
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
