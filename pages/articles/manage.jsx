import { useState } from "react";
import { Alert, Button, Card, Form, Row } from "react-bootstrap";
import Router from "next/router";

function manage({ User }) {
  const [article, setArticle] = useState();
  const [error, setError] = useState("");

  const submit = (e) => {
    if (article) {
      setError("");
      fetch("/api/create-article", {
        method: "POST",
        body: JSON.stringify(article),
      })
        .then((response) => {
          response.json().then((body) => {
            if (!body.success) {
              setError(
                body.error?.errors?.map((error) => {
                  return error.message + " ";
                })
              );
            } else {
              Router.push(JSON.parse(body.content)?.url || "");
            }
          });
        })
        .catch((error) => {
          console.log(error);
          setError("Could not reach the server!");
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
            Submit
          </Button>
        </Form.Group>
      </Card.Body>
    </Form>
  );
}

export default manage;
