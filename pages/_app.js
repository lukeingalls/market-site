import Header from "../components/Header.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import * as styles from "../styles/_app.module.scss";
import Head from "next/head";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>
          Bountiful Finance - Financial News From Independent Authors
        </title>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H1LCNW2L75"
        ></script>
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${process.env.GOOGLE_ANALYTICS});`,
          }}
        />
      </Head>
      <Provider session={pageProps.session}>
        <div className="bg-light">
          <Header />
          <Container className={`border bg-white ${styles["app-content"]}`}>
            <Component {...pageProps} />
          </Container>
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
