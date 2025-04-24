import styles from "../../_assets/scss/single.module.scss";
import global from "../../_assets/scss/page.module.scss";
import Image from "next/image";
import React, { useState } from 'react';
import { fetchApi } from "../../../../utils/fetchApi";
import YouTubePlayer from '../../_components/youtube';
import Rating from '../../_components/rating';
import Verdict from '../../_components/verdict';
import ModalTrailer from '../../_partials/trailer';
import { removePTags, youTubeGetID, limitWords } from "../../_hooks/slug";

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
                    year
                    directors {
                        title
                    }
                    actors {
                        title
                    }
                    distributors {
                        title
                    }
                    genres {
                        title
                    }
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
                            <div className={`${styles.hero_rate}`}>
                                <Rating rate={data.rating} />
                            </div>
                            <p className={styles.description}>
                                ${limitWords(removePTags(data.description), 80)}
                            </p>
                            <div className={styles.informations}>
                                <div className={styles.directors}>
                                    <span className={styles.prefix}>Director</span>
                                    <div className={styles.data}>
                                        {data.directors.length > 0 ? (
                                            data.directors.map((director: any, index: number) => (
                                                <span key={index}>{director.title}</span>
                                            ))
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.cast}>
                                    <span className={styles.prefix}>Cast</span>
                                    <div className={styles.data}>
                                        {data.actors.length > 0 ? (
                                            data.actors.map((actor: any, index: number) => ( 
                                                <span key={index}>{actor.title}</span>
                                            ))
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </div> 
                                </div>
                                <div className={styles.genres}>
                                    <span className={styles.prefix}>Genres</span>
                                    <div className={styles.data}>
                                        {data.actors.length > 0 ? (
                                            data.genres.map((genre: any, index: number) => ( 
                                                <span key={index}>{genre.title}</span>
                                            ))
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.year}>
                                    <span className={styles.prefix}>Year</span>
                                    <div className={styles.data}>{data.year}</div>
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