import global from "../../_assets/scss/page.module.scss";
import styles from "../../_assets/scss/single.module.scss";
import Image from "next/image";
import React from 'react';
import YouTubePlayer from '../../_components/youtube';

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Reviews - Single',
    };
}

interface YouTubePlayerProps {
    videoId: string;
}

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
    const {slug} = (await params);

    return (
        <div className={`${styles.single} ${global.page}`}>
            <div className={styles.hero}>
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
            <div className={styles.container}>
                <h1>Reviews Single {slug}</h1>
            </div>
        </div>
    )
}