import styles from "../../_assets/scss/single.module.scss";
import global from "../../_assets/scss/page.module.scss";
import fonts from "../../_assets/scss/_fonts.scss";
import Image from "next/image";
import React from 'react';
import YouTubePlayer from '../../_components/youtube';
import ModalTrailer from '../../_partials/trailer';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                            <ModalTrailer videoId="DX1Y8e7i6cw" />
                        </div>
                        <div className={styles.hero_content_right}>
                            <h1>Terminator 2 : Jugement Day</h1>
                            <div className={styles.hero_rate_trailer}>
                                <div className={`${styles.ratebox} ${styles.mediocre}`}><span className={styles.rate}>94%</span></div>
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
                <h2>Overview</h2>
                <div className={styles.overview}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nam ut tempore, laudantium quam hic dolore facere aliquid non ex neque debitis? Autem suscipit tempora itaque consequatur fuga consequuntur minus quis, aperiam sint repudiandae cumque, tempore totam molestiae nobis quaerat, optio ullam molestias qui natus. Molestias harum sequi ullam similique iste laudantium deserunt, necessitatibus repellat ipsam magnam nulla. Quod numquam dolor, illo ad deleniti assumenda sequi minima labore eius maiores explicabo quia accusamus! Doloremque mollitia temporibus quisquam neque dolorem, quasi expedita sit accusantium repellendus repudiandae ad error totam dignissimos exercitationem qui necessitatibus et voluptatum eos perferendis quidem minus odio? Sed.</p>
                </div>
                <div className={styles.verdict}>
                    <div className={styles.good}>
                        <h3 className={fonts.font}>The Good</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, sapiente?</li>
                            <li>Aut dolore consequatur enim doloremque porro nulla unde accusamus voluptates!</li>
                            <li>Similique ipsa fugit quas, itaque odit molestiae perferendis laudantium debitis!</li>
                            <li>Delectus suscipit nulla provident laudantium dignissimos nam amet labore earum!</li>
                            <li>Odit sed quisquam error repellendus omnis? Soluta blanditiis quaerat cupiditate.</li>
                        </ul>
                    </div>
                    <div className={styles.bad}>
                        <h3 className={fonts.font}>The Bad</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, sapiente?</li>
                            <li>Aut dolore consequatur enim doloremque porro nulla unde accusamus voluptates!</li>
                            <li>Similique ipsa fugit quas, itaque odit molestiae perferendis laudantium debitis!</li>
                            <li>Delectus suscipit nulla provident laudantium dignissimos nam amet labore earum!</li>
                            <li>Odit sed quisquam error repellendus omnis? Soluta blanditiis quaerat cupiditate.</li>
                            <li>Delectus suscipit nulla provident laudantium dignissimos nam amet labore earum!</li>
                            <li>Odit sed quisquam error repellendus omnis? Soluta blanditiis quaerat cupiditate.</li>
                            <li>Delectus suscipit nulla provident laudantium dignissimos nam amet labore earum!</li>
                            <li>Odit sed quisquam error repellendus omnis? Soluta blanditiis quaerat cupiditate.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}