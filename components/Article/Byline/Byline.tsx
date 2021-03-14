import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import * as styles from "../../../styles/Article/Byline.module.scss";
import { getTimeString } from "../../../lib/time";
import { User } from "@prisma/client";

interface BylineProps {
  user: User;
  createdAt: string | Date;
}

export default function Byline({ user, createdAt }: BylineProps) {
  const [open, setOpen] = useState(false);
  const { bio, image, name, title } = user;
  const time = getTimeString(new Date(createdAt));
  return (
    <Container
      className={`${styles["byline"]} border`}
      onMouseOver={() => {
        setOpen(true);
      }}
      onMouseOut={() => {
        setOpen(false);
      }}
    >
      <Row>
        {image && (
          <Col className={`${styles["profile-picture__col"]}`}>
            <img
              alt={name}
              className={`${styles["profile-picture"]}`}
              src={image}
            />
          </Col>
        )}
        <Col>
          {name && (
            <Row className="mx-0">
              <address className="mb-0">
                {`${name}${title ? `, ${title}` : ""}`}
              </address>
            </Row>
          )}
          <Row className="mx-0">
            <time
              style={{
                fontSize: "80%",
                fontWeight: 400,
              }}
              role="time"
              dateTime={createdAt.toString()}
              className="text-muted"
            >
              {`Published ${time}`}
            </time>
          </Row>
        </Col>
      </Row>
      {bio && (
        <Collapse in={open}>
          <Row className="mx-0">
            <p className="m-0 mt-2">{bio}</p>
          </Row>
        </Collapse>
      )}
    </Container>
  );
}
