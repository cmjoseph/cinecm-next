"use client";
import Link from "next/link";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { toSlug } from "../_hooks/slug";
import { getAllActors, getAllDirectors, getAllYears, getAllGenres } from "../_hooks/filters";
import { movies } from "../_hooks/data";
import { jobold } from "../fonts";
import { AiOutlineMenuFold } from "react-icons/ai";
import { RiCloseLargeFill } from "react-icons/ri";

import styles from "../_assets/scss/reviews.module.scss";
import partial from "../_assets/scss/movie.module.scss";
import filters from "../_assets/scss/filters.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
    const [searchTerm, setSearchTerm]               = useState("");
    const [selectedType, setSelectedType]           = useState("");
    const [selectedActor, setSelectedActor]         = useState("");
    const [selectedDirector, setSelectedDirector]   = useState("");
    const [selectedYear, setSelectedYear]           = useState("");
    const [selectedGenre, setSelectedGenre]         = useState("");
    const [isPanelOpen, setIsPanelOpen]             = useState(false);

    const container         = useRef<HTMLDivElement>(null);
    const panel             = useRef<HTMLDivElement>(null);
    const body              = useRef<HTMLDivElement>(null);
    const reviews           = useRef<HTMLDivElement[]>([]);
    const selectActorRef    = useRef<HTMLSelectElement>(null);
    const selectDirectorRef = useRef<HTMLSelectElement>(null);
    const selectYearRef     = useRef<HTMLSelectElement>(null);
    const selectGenreRef    = useRef<HTMLSelectElement>(null);
    
    const toggleClass = (e: any, className: string) => {
        const selects = [...document.querySelectorAll<HTMLSelectElement>('select')];
        if (e.parentElement.classList.contains(className)) {
            e.parentElement.classList.remove(className);
        } else {
            selects.map((select: any) => select.parentElement.classList.remove(filters.active));
            e.parentElement.classList.add(className);
        }
    }
    
    const closeSelect = (event: any) => {
        const selects = [...document.querySelectorAll<HTMLSelectElement>('select')];
        if (event.target.nodeName !== 'SELECT') {
            selects.map((select: any) => select.parentElement.classList.remove(filters.active))
        }
    }

    const handleToggle = () => {
        setIsPanelOpen(!isPanelOpen);
        if (!isPanelOpen) {
            if (window.innerWidth > 768) {
                gsap.fromTo(panel.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.5 });
            } else {
                document.body.classList.add('js-block');
                gsap.fromTo(panel.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.5 });
            }
        } else {
            if (window.innerWidth > 768) {
                gsap.fromTo(panel.current, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 }, { opacity: 0, x: -30, delay: 0.35});
            } else {
                document.body.classList.remove('js-block');
                gsap.fromTo(panel.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.35 }, { opacity: 0, y: 0, delay: 0.35});
            }
        }
    };

    const handleReset = () => {
        setSearchTerm('');
        setSelectedType('');
        if (selectActorRef.current) {setSelectedActor(''); selectActorRef.current.value = ""};
        if (selectDirectorRef.current) { setSelectedDirector(''); selectDirectorRef.current.value = ""};
        if (selectYearRef.current) {setSelectedYear(''); selectYearRef.current.value = ""};
        if (selectGenreRef.current) {setSelectedGenre(''); selectGenreRef.current.value = ""};
    };

    const actors    = getAllActors(movies);
    const directors = getAllDirectors(movies);
    const years     = getAllYears(movies);
    const genres    = getAllGenres(movies);

    const filteredMovies = useMemo(() => {
		return movies.filter((movie: any) => {
			const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesType = selectedType ? movie.type === selectedType : true;
            const matchesActor = !selectedActor || movie.actors.includes(selectedActor);
            const matchesDirector = !selectedDirector || movie.directors.includes(selectedDirector);
            const matchesYear = !selectedYear || movie.year === selectedYear;
            const matchesGenres = !selectedGenre || movie.genres.includes(selectedGenre);
			return matchesSearch && matchesType && matchesActor && matchesDirector && matchesYear && matchesGenres;
		});
	}, [searchTerm, selectedType, selectedActor, selectedDirector, selectedYear, selectedGenre]);
    
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
        <div className={`${styles.reviews} ${styles.page}`} onClick={(e) => closeSelect(e)}>
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
                                    className={`${filters.text} ${jobold.className}`}
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
                                <div className={filters.select} onClick={(e) => toggleClass(e.target, filters.active) }>
                                    <select defaultValue={""} ref={selectActorRef} className={`${jobold.className}`} onChange={(e) => setSelectedActor(e.target.value)}>
                                        <option value="">Select an actor</option>
                                        {actors.map((actor, index) => (
                                            <option key={index} value={actor}>{actor}</option>
                                        ))} 
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Directors */}
                        <div className={filters.group_select}>
                            <div className={filters.group}>
                                <label>Select Director</label>
                                <div className={filters.select} onClick={(e) => toggleClass(e.target, filters.active) }>
                                    <select defaultValue={""} ref={selectDirectorRef} className={`${jobold.className}`} onChange={(e) => setSelectedDirector(e.target.value)}>
                                        <option value="">Select an director</option>
                                        {directors.map((director, index) => (
                                            <option key={index} value={director}>{director}</option>
                                        ))} 
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Year */}
                        <div className={filters.group_select}>
                            <div className={filters.group}>
                                <label>Select Year</label>
                                <div className={filters.select} onClick={(e) => toggleClass(e.target, filters.active) }>
                                    <select defaultValue={""} ref={selectYearRef} className={`${jobold.className}`} onChange={(e) => setSelectedYear(e.target.value)}>
                                        <option value="">Select a year</option>
                                        {years.map((year, index) => (
                                            <option key={index} value={year}>{year}</option>
                                        ))} 
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Year */}
                        <div className={filters.group_select}>
                            <div className={filters.group}>
                                <label>Select Genre</label>
                                <div className={filters.select} onClick={(e) => toggleClass(e.target, filters.active) }>
                                    <select defaultValue={""} ref={selectGenreRef} className={`${jobold.className}`} onChange={(e) => setSelectedGenre(e.target.value)}>
                                        <option value="">Select a genre</option>
                                        {genres.map((genre, index) => (
                                            <option key={index} value={genre}>{genre}</option>
                                        ))} 
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={filters.reset}>
                            <button onClick={handleReset} className={filters.reset_btn}>
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.top}>
                    <h1>Reviews</h1>
                    {/* Trigger filters */}
                    <button onClick={handleToggle} className={`${isPanelOpen ? styles.open : styles.close}`}>
                        {isPanelOpen ? <RiCloseLargeFill /> : <AiOutlineMenuFold />}
                    </button>
                </div>
                <div className={partial.grid} ref={container}>
                {/* All Movies */}
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie, index) => (
                        <Link key={index} href={`/reviews/${toSlug(movie.title)}`} className={`${partial.grid_item} ${partial.grid_item_reviews}`} ref={(el: any) => { if (reviews.current) {(reviews.current[index] = el)} }}>
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
        </div>
    )
};