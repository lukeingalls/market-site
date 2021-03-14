import { User } from "@prisma/client";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import fetcher from "../../lib/fetcher";

const manage = () => {
  const [session, loading] = useSession();
  const [user, setUser] = useState<User>(session?.user as User);
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    setMessage("");
    e.preventDefault();
    try {
      const resp = await fetcher(
        "/api/account/post",
        "POST",
        JSON.stringify(user)
      );
      if (resp.status === 200) {
        setMessage("Your profile is updated ✅");
      } else {
        setMessage("Something went wrong 😔");
      }
    } catch (error) {
      setMessage("Couldn't contact the server 😮");
    }
  };

  useEffect(() => {
    setUser(session?.user as User);
  }, [session]);

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
            value={user?.name || ""}
            onChange={(e) => {
              setUser({
                ...user,
                name: e.target.value,
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
            Authors get more settings. Checkback to see if you are eligible.
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
