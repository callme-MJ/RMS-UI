import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout'
import styles from '../../styles/news.module.css'
import { data } from '../../helpers/newfeeds_data.js'
import Notifications from '../../components/notifications'

export async function getStaticProps() {
    return {
        props: {
            news: data.news,

        }
    }
}

function News({ news }) {


    const tagArrayToString = (tags) => {
        let tagString = '#'
        return tagString += tags.join(', #')
    }

    const router = useRouter()
    return (
        <Layout title='News'>
            <section className={styles.news_section}>
                <div className={`${styles.container} container`}>
                    <div className={styles.news_container}>
                        {
                            news.map((news_item, index) => (
                                <div key={index} className={styles.news} onClick={() => router.push(`/news/${news_item.slug}`)}>
                                    {news_item.image && <Image className={styles.news_img} src={news_item.image} layout='responsive' alt="sibaq at 22 darul huda art fest"></Image>}
                                    <div className={styles.news_content}>
                                        <h4>{news_item.heading}</h4>
                                        <p>{news_item.news_content.slice(0, 300) + '... '}
                                            <span className={styles.read_more}> Read more</span>
                                        </p>
                                        <div className={styles.news_details}>
                                            <p className={styles.news_date}> {news_item.date}</p>
                                            <p className={styles.news_tags}>{tagArrayToString(news_item.tags)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div></div>
                    <div className={styles.notification_container}>
                        <h3>Notifications</h3>
                        <div className={styles.line}></div>
                        <Notifications />
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default News