import { Container, Row, Spinner } from "react-bootstrap";
import {
  HandThumbsDownFill,
  HandThumbsUpFill,
  Icon,
} from "react-bootstrap-icons";
import { ReactionCount } from "../../../pages/articles/[articleId]";
import * as styles from "../../../styles/Article/Reactions.module.scss";

type reactionFunction = (value: string) => void;

interface ReactionData {
  className: string;
  Component: Icon;
  reaction: string;
}

interface ReactionsProp {
  className?: string;
  loading: boolean;
  reactionCount: ReactionCount[];
  reaction?: string;
  setReaction: reactionFunction;
}

interface ReactionProp {
  isActive: boolean;
  count: number;
  reaction: ReactionData;
  setReaction: reactionFunction;
}

const REACTIONSLIST: ReactionData[] = [
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

const Reaction = ({
  isActive,
  count = 0,
  reaction,
  setReaction,
}: ReactionProp) => {
  const onReaction = () => {
    setReaction(isActive ? "" : reaction.reaction);
  };

  return (
    <span className="d-flex flex-column text-center">
      <reaction.Component
        className={`${isActive ? reaction.className : ""} ${
          styles["reaction"]
        }`}
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
  return (
    <Container
      className={`${styles["reaction__container"]} border ${className || ""}`}
    >
      <h4 className={`${styles["reaction__header"]}`}>Rate Article</h4>
      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Row className={`${styles["reaction__button-group"]}`}>
          {REACTIONSLIST.map((r) => {
            const count =
              reactionCount?.find((rc) => {
                return r.reaction === rc.type;
              })?.count._all || 0;
            return (
              <Reaction
                key={r.reaction}
                isActive={reaction === r.reaction}
                count={count}
                reaction={r}
                setReaction={setReaction}
              />
            );
          })}
        </Row>
      )}
    </Container>
  );
}
