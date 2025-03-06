"use client";
import styles from "../_assets/scss/upcoming.module.scss";
import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Coming({items}: any) {
    const container = useRef<HTMLDivElement>(null);
    const posters   = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        if (posters.current.length === 0) return;
        gsap.from(posters.current, {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true
            },
        });
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set(posters.current, { clearProps: "all" });
        };
    }, []);

    return (
        <div className={styles.grid} ref={container}>
            {items.slice(0, 3).map((item: any, index: any) => (
                <div key={index} ref={(el: any) => { if (posters.current) {(posters.current[index] = el)} }} className={styles.grid_item} >
                    <div className={styles.overlay}>
                        {item.title}
                    </div>
                    <img src={item.poster} alt={item.title} />
                </div>
            ))}
        </div>
    )
};