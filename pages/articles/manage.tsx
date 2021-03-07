import { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import Router from "next/router";
import fetcher from "../../lib/fetcher";
import { useAuth } from "../../contexts/Auth";
import { ArticleAttributes } from "../../lib/db/models";
import { NextApiResponse } from "next";

function manage() {
  const [article, setArticle] = useState<ArticleAttributes>();
  const [error, setError] = useState("");
  const { token } = useAuth();

  const submit = (e) => {
    e.preventDefault();
    if (article) {
      setError("");
      fetcher("/api/create-article", token, "POST", JSON.stringify(article))
        .then((response) => {
          console.log(response);
          if (response?.success) {
            Router.push(JSON.parse(response?.content)?.url || "/");
          } else {
            setError("Something went wrong 😕...");
          }
        })
        .catch((error) => {
          console.error(error);
          setError("Couldn't contact the server 😧...");
        });
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
            checked={article?.publish || false}
            onChange={(e) => {
              setArticle({
                ...article,
                publish: e.target.checked,
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
