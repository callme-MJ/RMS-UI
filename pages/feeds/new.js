import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/layout";
import styles from "../../styles/news.module.css";
// import { data } from "../../helpers/newfeeds_data.js";
import Notifications from "../../components/notifications";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import baseApi from "../../api/baseApi";
import { useEffect, useState } from "react";

 

function News( ) {
  const [news, setNews] =  useState([]);

  useEffect(() => {
    baseApi.get("/public/media/").then((res) => {
      setNews(res.data.data);
    });
  }, []);

  console.log(news);
  const tagArrayToString = (tags) => {
    let tagString = "#";
    return (tagString += tags.join(", #"));
  };

  const router = useRouter();
  const sortedNews = news.sort((a, b) => {
    return b.id - a.id;
  });
  return (
    <Layout title="Sibaq 2022 Feeds">
      <section className={styles.news_section}>
        <div className={`${styles.container} container`}>
          <div className={styles.news_container}>
            {sortedNews.map((news_item, index) => (
              <div
                key={index}
                className={styles.news}
                onClick={() => router.push(`/feeds/${news_item.slug}`)}
              >
                {news_item.image && news_item.type == "news" && (
                  <Image
                    className={styles.news_img}
                    src={news_item.image}
                    layout="responsive"
                    alt="sibaq at 22 darul huda art fest"
                  ></Image>
                )}
                {news_item.type == "radio" && (
                  <AudioPlayer
                    // autoPlay
                    src={news_item.file}
                    // onPlay={e => console.log("onPlay")}
                    // other props here
                  />
                )}
                {news_item.type == "video" && (
                  <YoutubeEmbed embedId={news_item.file} />
                )}
                <div className={styles.news_content}>
                  <h4>{news_item.heading}</h4>
                  <p>
                    {news_item.content.slice(0, 300) + "... "}
                    <span className={styles.read_more}> Read more</span>
                  </p>
                  <div className={styles.news_details}>
                    <p className={styles.news_date}> {news_item.date}</p>
                    <p className={styles.news_tags}>
                      {tagArrayToString(news_item.tags)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div></div>
          <div className={styles.notification_container}>
            <h3>Notifications</h3>
            <div className={styles.line}></div>
            <Notifications />
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default News;
