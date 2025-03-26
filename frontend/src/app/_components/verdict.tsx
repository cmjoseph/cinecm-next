"use client";
import styles from "../_assets/scss/verdict.module.scss";
import fonts from "../_assets/scss/_fonts.scss";
import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from 'next/navigation'
import { jobold } from "../fonts";

gsap.registerPlugin(ScrollTrigger);

export default function Verdict({data}: any ) {
    const containerRef  = useRef<HTMLDivElement>(null);
  	const titleRef      = useRef<HTMLDivElement>(null);
  	const viewRef       = useRef<HTMLDivElement>(null);
      
    const type      = (data[0]).toString();
    const seasons   = data[1];
    const overview  = data[2];
    const goods     = data[3];
    const bads      = data[4];
    const last      = `season_${seasons[seasons.length - 1]}`;
    
    const [tabActive, setTabActive] = useState(last);
    const toggleClass = (e: any) => {
        setTabActive(e.target.value);
    }

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 20%",
                scrub: true,
            },
        });
        tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 3, ease: 'power3.inOut', delay: 5});
        tl.fromTo(viewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 5, ease: 'power3.inOut'});
       
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set([titleRef.current, viewRef.current], { clearProps: "all" });
        };
	}, []);

	return (
		<div className={styles.container} ref={containerRef}>
            <h2 ref={titleRef}>Overview</h2>
            {type == 'movie' ? (
                <div className={styles.wrapper} ref={viewRef}>
                    <div className={styles.overview}>
                        <p>{overview}</p>
                    </div>
                    <div className={styles.verdict}>
                        <div className={styles.good}>
                            <h3 className={fonts.font}>The Good</h3>
                            <ul>
                                {goods.map((good: any, index: number) => (
                                    <li key={index}>{good}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.bad}>
                            <h3 className={fonts.font}>The Bad</h3>
                            <ul>
                                {bads.map((bad: any, index: number) => (
                                    <li key={index}>{bad}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.wrapper} ref={viewRef}>
                    <div className={styles.seasons}>
                        <div className={styles.tabs}>
                        {seasons.toReversed().map((season: any, index: number) => (
                            <button key={index} onClick={(e) => toggleClass(e)} className={`${jobold.className} ${styles.tab} ${tabActive === `season_${season}` ? styles.active : ''}`} value={`season_${season}`}>Season {season}</button>
                        ))}
                        </div>
                        {seasons.map((season: any, index: number) => (
                            <div key={index} className={`${styles.season} ${tabActive === `season_${season}` ? styles.active : ''}`}>
                                <div className={styles.overview}>
                                    <h3>Season {season}</h3>
                                    <p>{overview}</p>
                                </div>
                                <div className={styles.verdict}>
                                    <div className={styles.good}>
                                        <h3 className={fonts.font}>The Good</h3>
                                        <ul>
                                            {goods.map((good: any, index: number) => (
                                                <li key={index}>{good}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={styles.bad}>
                                        <h3 className={fonts.font}>The Bad</h3>
                                        <ul>
                                            {bads.map((bad: any, index: number) => (
                                                <li key={index}>{bad}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
	);
}
