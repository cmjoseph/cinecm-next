import styles from "../../_assets/scss/single.module.scss";
import global from "../../_assets/scss/page.module.scss";
import Image from "next/image";
import React, { useState } from 'react';
import { fetchApi } from "../../../../utils/fetchApi";
import YouTubePlayer from '../../_components/youtube';
import Rating from '../../_components/rating';
import Verdict from '../../_components/verdict';
import ModalTrailer from '../../_partials/trailer';
import { removePTags, youTubeGetID } from "../../_hooks/slug";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Reviews - Single',
    };
}

async function getContent(movie: string) {
    const data = await fetchApi(`
        query {
            moviesEntries(slug: "${movie}") {
                ... on movie_Entry {
                    title
                    url
                    slug
                    trailer
                    id
                    theBad
                    theGood
                    upcoming
                    typeReview(label: false)
                    reviewInFrench
                    rating
                    runtime
                    description
                    date
                    status
                    background {
                        id
                        filename
                        path
                    }
                    poster {
                        id
                        filename
                        path
                    }
                }
            }
        }
    `);
    return data;
}

export default async function Page({params}: {params: Promise<{ slug: string, rate: string, data: any[] }>}) {
    const {slug} = (await params);
    const content = await getContent(slug);
    const data = content.data.moviesEntries[0];
    console.log(data);
    return (
        <div className={`${styles.single} ${global.page}`}>
            <div className={styles.hero}>
                <div className={styles.hero_under}>
                    <div className={styles.overlay}></div>
                    <Image
                        src={`/images/movies/${data.background[0].filename}`}
                        width={1920}
                        height={1080}
                        alt={data.title}
                        style={{ width: "100%", height: "100%" }}
                        className={styles.background}
                    />
                    <YouTubePlayer videoId={`${youTubeGetID(data.trailer)}`} />
                </div>
                <div className={styles.hero_over}>
                    <div className={styles.hero_content}>
                        <div className={styles.hero_content_left}>
                            <Image 
                                src={`/images/movies/${data.poster[0].filename}`}
                                width={450}
                                height={680}
                                alt={data.title}
                                style={{ width: "100%", height: "auto" }}
                                className={styles.poster}
                            />
                            <ModalTrailer videoId={`${youTubeGetID(data.trailer)}`} />
                        </div>
                        <div className={styles.hero_content_right}>
                            <h1>{data.title}</h1>
                            <div className={styles.hero_rate}>
                                <Rating rate={`${data.rating}%`} />
                            </div>
                            <p className={styles.description}>
                                ${removePTags(data.description)}
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
            {/* <Verdict data={data} /> */}
        </div>
    )
}