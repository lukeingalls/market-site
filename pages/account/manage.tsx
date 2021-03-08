import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../../contexts/Auth";
import fetcher from "../../lib/fetcher";

const manage = () => {
  const { userData, token } = useAuth();
  const [user, setUser] = useState(userData);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    setMessage("");
    e.preventDefault();
    try {
      const resp = await fetcher(
        "/api/update/user",
        token,
        "POST",
        JSON.stringify(user)
      );
      if (resp.success) {
        setMessage("Your profile is updated ✅");
      } else {
        setMessage("Something went wrong 😔");
      }
    } catch (error) {
      setMessage("Couldn't contact the server");
      console.error(error);
    }
  };

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <Container className="pt-4">
      {message && <Alert variant="info">{message}</Alert>}
      <Form
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <Form.Group>
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Create display name"
            value={user?.displayName || ""}
            onChange={(e) => {
              setUser({
                ...user,
                displayName: e.target.value,
              });
            }}
          />
        </Form.Group>
        {user?.author ? (
          <>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Analyst at..."
                value={user.title || ""}
                onChange={(e) => {
                  setUser({
                    ...user,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Give a description of yourself for the readers"
                value={user.bio || ""}
                onChange={(e) => {
                  setUser({
                    ...user,
                    bio: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </>
        ) : (
          <Alert variant="info">
            Authors get more settings. Checkback to see if you are eligible.{" "}
          </Alert>
        )}
        <Button variant="info" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default manage;
