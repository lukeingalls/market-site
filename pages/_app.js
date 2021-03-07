import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import * as styles from "../styles/_app.module.scss";
import AuthProvider from "../contexts/Auth.tsx";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="bg-light">
        <Header />
        <Container className={`border bg-white ${styles["app-content"]}`}>
          <Component {...pageProps} />
        </Container>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
