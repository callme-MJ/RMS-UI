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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rerum explicabo pariatur earum molestias illo, sit eaque quas repellat officia placeat incidunt, autem quibusdam ab error deserunt est dolor? Incidunt.</p>

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
    </div>
  );
}
