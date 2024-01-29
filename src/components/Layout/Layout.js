import Head from "next/head";
import Header from "@components/Header";

import styles from "./Layout.module.scss";

const Layout = ({ children, className, ...rest }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/beecoming_logo.svg" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
