import Head from "next/head";
import styles from "../styles/landing-page.module.css";

export default function LandingPage() {
  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        header
        <div className={styles.navbar}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <div className={styles.biglogo}>
          {/* <Image className={styles.header_img}></Image> */}
        </div>
      </div>
      <div className={styles.about}>
        <h2>ABOUT US</h2>
      </div>
    </div>

  );
}
