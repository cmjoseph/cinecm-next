"use client";
import Link from "next/link";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toSlug, getAllActors } from "../_hooks/slug";
import { movies } from "../_hooks/data";

import styles from "../_assets/scss/reviews.module.scss";
import partial from "../_assets/scss/movie.module.scss";
import filters from "../_assets/scss/filters.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const [searchTerm, setSearchTerm]               = useState("");
    const [selectedType, setSelectedType]           = useState("");
    const [selectedActor, setSelectedActor]         = useState("");
    const [isPanelOpen, setIsPanelOpen]             = useState(false);

    const container = useRef<HTMLDivElement>(null);
    const panel     = useRef<HTMLDivElement>(null);
    const reviews   = useRef<HTMLDivElement[]>([]);

    const handleToggle = () => {
        setIsPanelOpen(!isPanelOpen);
        if (!isPanelOpen) {
            gsap.fromTo(panel.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.5 });
        } else {
            gsap.fromTo(panel.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 }, { opacity: 0, x: -30, delay: 0.35});
        }
    };

    const actors = getAllActors(movies);

    console.log(actors);

    const filteredMovies = useMemo(() => {
		return movies.filter((movie: any) => {
			const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesType = selectedType ? movie.type === selectedType : true;
            const matchesActor = !selectedActor || movie.actors.includes(selectedActor);
			return matchesSearch && matchesType && matchesActor;
		});
	}, [searchTerm, selectedType, selectedActor]);
    
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
                <div className={styles.top}>
                    <h1>Reviews</h1>
                    {/* Trigger filters */}
                    <button onClick={handleToggle} className={`${isPanelOpen ? styles.open : ''}`}>
                        {isPanelOpen ? 'Close Filters' : 'Filters'}
                    </button>
                </div>
                <div className={partial.grid} ref={container}>
                {/* All Movies */}
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
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
                    ))
                ) : (
                    <div className={partial.empty}>No movies found.</div>
                )}
                </div>
            </div>
            <div className={`${styles.panel} ${isPanelOpen ? styles.open : ''}`}>
                <div className={styles.wrapper} ref={panel}>
                    <h2>Sort by</h2>
                    <div className={filters.filters}>
                        {/* Types */}
                        <div className={filters.group_radio}>
                            <div className={filters.group}>
                                <input
                                    type="radio"
                                    id="all"
                                    name="filter"
                                    placeholder='Search all'
                                    className={filters.radio}
                                    value=""
                                    checked={selectedType === ""}
                                    onChange={() => setSelectedType("")}
                                />
                                <label htmlFor="all">All</label>
                            </div>
                            <div className={filters.group}>
                                <input
                                    type="radio"
                                    id="tv"
                                    name="filter"
                                    placeholder='Search tv'
                                    className={filters.radio}
                                    value="tv"
                                    checked={selectedType === "tv"}
                                    onChange={() => setSelectedType("tv")}
                                />
                                <label htmlFor="tv">TV</label>
                            </div>
                            <div className={filters.group}>
                                <input
                                    type="radio"
                                    id="movie"
                                    name="filter"
                                    placeholder='Search movie'
                                    className={filters.radio}
                                    value="movie"
                                    checked={selectedType === "movie"}
                                    onChange={() => setSelectedType("movie")}
                                />
                                <label htmlFor="movie">Movie</label>
                            </div>
                        </div>
                        {/* Search titles */}
                        <div className={filters.group_text}>
                            <div className={filters.group}>
                                <label>Search titles</label>
                                <input
                                    className={filters.text}
                                    placeholder="Search titles..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Actors */}
                        <div className={filters.group_select}>
                            <div className={filters.group}>
                                <label>Select Actor</label>
                                <div className={filters.select}>
                                    <select onChange={(e) => setSelectedActor(e.target.value)}>
                                        <option selected value="">Select an actor</option>
                                        {actors.map((actor, index) => (
                                            <option key={index} value={actor}>{actor}</option>
                                        ))} 
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};