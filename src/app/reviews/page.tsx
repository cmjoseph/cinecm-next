"use client";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toSlug } from "../_hooks/slug";
import { movies } from "../_hooks/data";
import Search from "../_components/searchFilter";

import styles from "../_assets/scss/reviews.module.scss";
import partial from "../_assets/scss/movie.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const container     = useRef<HTMLDivElement>(null);
    const reviews       = useRef<HTMLDivElement[]>([]);

    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    const filteredData = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );

    useLayoutEffect(() => {
        if (reviews.current.length === 0) return;
        gsap.from(reviews.current, {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            },
        });
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set(reviews.current, { clearProps: "all" });
        };
    }, []);

    return (
        <div className={styles.reviews}>
            <div className={styles.container}>
                <h1>Reviews</h1>
                <div className={partial.grid} ref={container}>
                    {filteredData.map((movie, index) => (
                        <Link key={index} href={`/reviews/${toSlug(movie.title)}`} className={partial.grid_item} ref={(el: any) => { if (reviews.current) {(reviews.current[index] = el)} }}>
                            <div className={partial.poster}>
                                <div className={partial.overlay}>
                                    <h3>{movie.title}</h3>
                                </div>
                                <img src={movie.poster} alt={movie.title} />
                                <div className={partial.rate}>{movie.rate}</div>
                            </div>
                            <h4>{movie.title}</h4>
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.panel}>
                <div className={styles.wrapper}>
                    <h2>Sort by</h2>
                    <div className={styles.group}>
                        <label>Search</label>
                        <Search placeholder="Search movies..." />
                    </div>
                </div>
            </div>
        </div>
    )
};