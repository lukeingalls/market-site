import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { HandThumbsDownFill, HandThumbsUpFill } from "react-bootstrap-icons";
import * as styles from "../../../styles/Article/Reactions.module.scss";

const Reaction = ({ active, className, Component, reaction, setReaction }) => {
  const onReaction = () => {
    setReaction(active ? "" : reaction);
  };

  return (
    <Component
      className={`${active ? className : ""} ${styles.reaction}`}
      onClick={onReaction}
    />
  );
};

export default function Reactions({ className }) {
  const [userReaction, setUserReaction] = useState("");
  const reactionsList = [
    {
      reaction: "like",
      Component: HandThumbsUpFill,
      className: styles["reaction--info"],
    },
    {
      reaction: "dislike",
      Component: HandThumbsDownFill,
      className: styles["reaction--danger"],
    },
  ];

  return (
    <Container
      className={`${styles.reaction__container} border ${className || ""}`}
    >
      <h4 className={`${styles.reaction__header}`}>Rate Article</h4>
      <Row className={`${styles["reaction__button-group"]}`}>
        {reactionsList.map((reaction) => {
          return (
            <Reaction
              key={reaction.reaction}
              active={userReaction === reaction.reaction}
              className={reaction.className}
              Component={reaction.Component}
              reaction={reaction.reaction}
              setReaction={setUserReaction}
            />
          );
        })}
      </Row>
    </Container>
  );
}
