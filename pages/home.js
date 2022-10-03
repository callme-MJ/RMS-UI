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
        <div className={styles.navbar}>
          <div className={styles.bars}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>

        </div>
        <div className={styles.biglogo}>
        </div>
      </div>

      <div>


      </div>
      <div className={styles.coutdownSection}>
        <h2>COUNTDOWN</h2>
        <span className={styles.countSpans}>
           <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
           </div>
           <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
           </div>
           <div className={styles.spans}>
            <h3>00</h3>
            <h2>WEEKS</h2>
           </div>

        </span>

      </div>
    </div>

  );
}
