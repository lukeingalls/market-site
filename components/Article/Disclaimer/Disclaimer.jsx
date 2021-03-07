import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import * as styles from "../../../styles/Article/Disclaimer.module.scss";

export default function Disclaimer({ className }) {
  return (
    <Container className={`${styles.disclaimer} ${className} border my-3`}>
      {
        "All writers’ opinions are their own and do not constitute financial advice. \
        Nothing published by this site constitutes an investment recommendation, \
        nor should any data or content published be relied upon for any investment activities. \
        It is strongly recommended that you perform your own independent research and/\
        or speak with a qualified investment professional before making any financial decisions."
      }
    </Container>
  );
}

Disclaimer.propTypes = {
  className: PropTypes.string,
};
