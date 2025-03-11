import global from "../../_assets/scss/page.module.scss";
import styles from "../../_assets/scss/single.module.scss";
import Image from "next/image";
import React from 'react';
import YouTubePlayer from '../../_components/youtube';
import ShowTrailer from '../../_partials/trailer';

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Reviews - Single',
    };
}

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
    const {slug} = (await params);

    return (
        <div className={`${styles.single} ${global.page}`}>
            <div className={styles.hero}>
                <div className={styles.hero_under}>
                    <div className={styles.overlay}></div>
                    <Image
                        src='/images/movies/terminator2/background.jpg'
                        width={1920}
                        height={1080}
                        alt='Terminator 2'
                        priority={true}
                        style={{ width: "100%", height: "auto" }}
                        className={styles.background}
                    />
                    <YouTubePlayer videoId="DX1Y8e7i6cw" />
                </div>
                <div className={styles.hero_over}>
                    <div className={styles.hero_content}>
                        <div className={styles.hero_content_left}>
                            <Image
                                src='/images/movies/terminator2/poster.webp'
                                width={450}
                                height={680}
                                alt='Terminator 2'
                                priority={true}
                                style={{ width: "450px", height: "auto" }}
                                className={styles.poster}
                            />
                        </div>
                        <div className={styles.hero_content_right}>
                            <h1>Terminator 2 : Jugement Day</h1>
                            <div className={styles.hero_rate_trailer}>
                                <div className={`${styles.ratebox} ${styles.great}`}><span className={styles.rate}>94%</span></div>
                                <ShowTrailer />
                            </div>
                            <p className={styles.description}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis odit quibusdam voluptatum rerum nulla facere cumque numquam tempore eos provident, doloremque voluptates atque ullam? Recusandae labore voluptatem nesciunt culpa eveniet facere quasi non animi a laboriosam. Magni id facilis iusto!
                            </p>
                            <div className={styles.informations}>
                                <div className={styles.directors}>
                                    <span className={styles.prefix}>Director</span>
                                    <span className={styles.data}>James Cameron</span>
                                </div>
                                <div className={styles.cast}>
                                    <span className={styles.prefix}>Cast</span>
                                    <span className={styles.data}>Arnorld Schwarzenegger, Linda Hamilton, Edward Furlong, Robert Patrick</span> 
                                </div>
                                <div className={styles.genres}>
                                    <span className={styles.prefix}>Genres</span>
                                    <span className={styles.data}>Action, Science-fiction</span>
                                </div>
                                <div className={styles.year}>
                                    <span className={styles.prefix}>Year</span>
                                    <span className={styles.data}>1991</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <h2>Reviews Single {slug}</h2>
            </div>
        </div>
    )
}