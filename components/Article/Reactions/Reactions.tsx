import { Container, Row, Spinner } from "react-bootstrap";
import { HandThumbsDownFill, HandThumbsUpFill } from "react-bootstrap-icons";
import { ReactionCount } from "../../../pages/articles/[articleId]";
import * as styles from "../../../styles/Article/Reactions.module.scss";

interface ReactionsProp {
  className?: string;
  loading: Boolean;
  reactionCount: ReactionCount[];
  reaction?: string;
  setReaction: Function;
}

interface ReactionProp {
  active: boolean;
  className?: string;
  Component: any; // TODO: change type
  count: number;
  reaction: string;
  setReaction: any; // TODO: change type
}

const Reaction = ({
  active,
  className,
  Component,
  count = 0,
  reaction,
  setReaction,
}: ReactionProp) => {
  const onReaction = () => {
    setReaction(active ? "" : reaction);
  };

  return (
    <span className="d-flex flex-column text-center">
      <Component
        className={`${active ? className : ""} ${styles["reaction"]}`}
        onClick={onReaction}
      />
      {count}
    </span>
  );
};

export default function Reactions({
  className,
  loading,
  reactionCount,
  reaction,
  setReaction,
}: ReactionsProp) {
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
      className={`${styles["reaction__container"]} border ${className || ""}`}
    >
      <h4 className={`${styles["reaction__header"]}`}>Rate Article</h4>
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Row className={`${styles["reaction__button-group"]}`}>
          {reactionsList.map((r) => {
            const count =
              reactionCount?.find((rc) => {
                return r.reaction === rc.type;
              })?.count._all || 0;
            return (
              <Reaction
                key={r.reaction}
                active={reaction === r.reaction}
                className={r.className}
                Component={r.Component}
                count={count}
                reaction={r.reaction}
                setReaction={setReaction}
              />
            );
          })}
        </Row>
      )}
    </Container>
  );
}
