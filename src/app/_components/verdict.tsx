"use client";
import styles from "../_assets/scss/verdict.module.scss";
import fonts from "../_assets/scss/_fonts.scss";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams } from 'next/navigation'

gsap.registerPlugin(ScrollTrigger);

export default function Verdict({data}: any ) {
    const containerRef  = useRef<HTMLDivElement>(null);
  	const titleRef      = useRef<HTMLDivElement>(null);
  	const viewRef       = useRef<HTMLDivElement>(null);
  	const goodRef       = useRef<HTMLDivElement>(null);
  	const badRef        = useRef<HTMLDivElement>(null);
  	const goodsRef      = useRef<(HTMLLIElement | null)[]>([]);
  	const badsRef      = useRef<(HTMLLIElement | null)[]>([]);

    const overview  = data[0];
    const goods     = data[1];
    const bads      = data[2];

    useLayoutEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "top 20%",
                scrub: true,
                markers: true
            },
        });
        tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 3, ease: 'power3.inOut', delay: 5});
        tl.fromTo(viewRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 3, ease: 'power3.inOut'});
        tl.fromTo(goodRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 3, ease: 'power3.inOut'});
        tl.fromTo(badRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 3, ease: 'power3.inOut'});
        tl.fromTo(goodsRef.current, { opacity: 0, y:-20 }, { opacity: 1, y: 0, duration: 3, stagger: 1.5, ease: 'power3.inOut'});
        tl.fromTo(badsRef.current, { opacity: 0, y:-20 }, { opacity: 1, y: 0, duration: 3, stagger: 1.5, ease: 'power3.inOut'});
       
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set(titleRef.current, { clearProps: "all" });
        };
	}, []);

	return (
		<div className={styles.container} ref={containerRef}>
            <h2 ref={titleRef}>Overview</h2>
            <div className={styles.overview}>
                <p ref={viewRef}>{overview}</p>
            </div>
            <div className={styles.verdict}>
                <div className={styles.good}>
                    <h3 className={fonts.font} ref={goodRef}>The Good</h3>
                    <ul>
                        {goods.map((good: any, index: number) => (
                            <li key={index} ref={(el: any) => { if (goodsRef.current) {(goodsRef.current[index] = el)} }}>{good}</li>
                        ))}
                    </ul>
                </div>
                <div className={styles.bad}>
                    <h3 className={fonts.font} ref={badRef}>The Bad</h3>
                    <ul>
                        {bads.map((bad: any, index: number) => (
                            <li key={index} ref={(el: any) => { if (badsRef.current) {(badsRef.current[index] = el)} }}>{bad}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
	);
}
