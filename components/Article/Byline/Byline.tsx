import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import * as styles from "../../../styles/Article/Byline.module.scss";
import { getTimeString } from "../../../lib/time";
import { UserAttributes } from "../../../lib/db/models";

interface BylineProps {
  user: UserAttributes;
  createdAt: string | Date;
}

export default function Byline({ user, createdAt }: BylineProps) {
  const [open, setOpen] = useState(false);
  const { displayName, bio, title } = user;
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
        {/* {img && (
          <Col className={`${styles["profile-picture__col"]}`}>
            <img
              alt={displayName}
              className={`${styles["profile-picture"]}`}
              src={img}
            />
          </Col>
        )} */}
        <Col>
          {displayName && (
            <Row className="mx-0">
              <address className="mb-0">
                {`${displayName}${title ? `, ${title}` : ""}`}
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
