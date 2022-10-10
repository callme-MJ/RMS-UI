import Head from "next/head";
import { useState    } from "react";
import Image from "next/image";

import styles from "../styles/landing-page.module.css";
// images
import loginBtn from "../public/assets/login.svg";
import big_logo from "../public/assets/big_logo_.png"
import logo_shadow from "../public/assets/big_logo_shadow.png"
import dhiu from "../public/assets/dhiu.png"
import HomeMenu from "../components/homeMenu";
import Toppers from "../components/toppers";
import Footer from "../components/footer";
import Coutdown from "../components/coutdown";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter()
 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="">
      <Head>
        <title>Sibaq-22</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.bars} onClick={setIsMenuOpen}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
          <div onClick={()=>router.push('/auth/login')} className={styles.navLoginBtn}>
            <Image src={loginBtn} layout={'responsive'}></Image>
          </div>
        </div>
        <div className={styles.biglogoDiv}>
          <Image className={styles.logo} src={big_logo} layout="responsive" alt="sibaq" ></Image>
        </div>
        <div className={styles.bottomImageDiv}>
          <Image className={styles.bottomImage} src={dhiu} layout="responsive" alt="sibaq"></Image>
        </div>
        <div className={styles.logoShadowDiv}>
          <Image className={styles.logoShadow} src={logo_shadow} layout="responsive" alt="sibaq"></Image>
        </div>

      </header>

       
      <HomeMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className={isMenuOpen ? styles.shadow : ''} onClick={() => setIsMenuOpen(false)}></div>

      <section id="about" className={styles.about}>
        <div className={`${styles.about_container} container`}>
          <div className={styles.about_container_img}>
            <Image src="/assets/dh.png" layout="fill" ></Image>
          </div>
          <h2>ABOUT US</h2>
          <p>Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.Darul Huda Sibaq is the national art fest of DHIU and its UG colleges officially sanctioned and supported by DHIU and its coordination committee to help, promote and develop educational activities of concerned students. Participation in the fest is intended to foster high standard and stimulate creativity in various fields.
            Sibaq was held in 2004, 2011, 2014 and 2016 in DHIU and UG campuses under the auspices of Darul Huda in association with its coordination committee. The programme has been instrumental in the development of extra-curricular activities and creative thinking of participants and to cultivate productive interest in upcoming generations.</p>
        </div>
      </section>
      <Coutdown  />

      
      <Toppers />
      <Footer />

    </div>
  );
}
