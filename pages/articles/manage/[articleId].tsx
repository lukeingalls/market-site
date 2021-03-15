import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import Router, { useRouter } from "next/router";
import fetcher from "../../../lib/fetcher";
import { Article } from "@prisma/client";
import { useSession } from "next-auth/client";

function manage() {
  const router = useRouter();
  const [article, setArticle] = useState<Article>();
  const [session, loading] = useSession();
  const [error, setError] = useState("");
  const { articleId } = router.query;

  useEffect(() => {
    let mount = true;
    if (session?.user && articleId && articleId !== "new") {
      (async () => {
        const resp = await fetcher(
          "/api/article/get",
          "POST",
          JSON.stringify({ id: articleId })
        );
        if (mount) {
          if (resp.status === 200) {
            const respArticle = await resp.json();
            setArticle(respArticle as Article);
          } else {
            setError("Couldn't fetch the article 😩");
          }
        }
      })();
    }
    return () => {
      mount = false;
    };
  }, [session, articleId]);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (articleId === "new") {
      (async () => {
        const res = await fetcher(
          "/api/article/put",
          "PUT",
          JSON.stringify(article)
        );
        if (res.status === 200) {
          const retArticle = await res.json();
          router.push("/articles/" + retArticle.url);
        } else {
          switch (res.status) {
            case 401:
              setError("You aren't authorized to perform this action 🙃");
              break;
            default:
              setError("Something went wrong 😕...");
              break;
          }
        }
      })();
    } else {
      (async () => {
        const res = await fetcher(
          "/api/article/post",
          "POST",
          JSON.stringify(article)
        );
        if (res.status === 200) {
          if (article.published) {
            router.push("/articles/" + article.url);
          } else {
            setError("Your article has been updated 😁");
          }
        } else {
          setError("Couldn't update the article 🤷...");
        }
      })();
    }
  };

  return (
    <Form as={Card} onSubmit={submit}>
      {error && <Alert variant="warning">{error}</Alert>}
      <Card.Header>Create an Article</Card.Header>
      <Card.Body>
        <Form.Group controlId="form.title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="$XYZ is Undervalued..."
            value={article?.title || ""}
            onChange={(e) => {
              setArticle({
                ...article,
                title: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="form.subtitle">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Why I think it will get to..."
            value={article?.subtitle || ""}
            onChange={(e) => {
              setArticle({
                ...article,
                subtitle: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="form.body">
          <Form.Label>Article text (use markdown)</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={article?.body || ""}
            onChange={(e) => {
              setArticle({
                ...article,
                body: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group as={Row} className="align-items-center justify-content-end">
          <Form.Check
            type="switch"
            id="form.switch"
            label="Publish article"
            checked={article?.published || false}
            onChange={(e) => {
              setArticle({
                ...article,
                published: e.target.checked,
              });
            }}
          />
          <Button
            className="mx-3"
            type="submit"
            variant="info"
            onClick={submit}
          >
            Save
          </Button>
        </Form.Group>
      </Card.Body>
    </Form>
  );
}

export default manage;
