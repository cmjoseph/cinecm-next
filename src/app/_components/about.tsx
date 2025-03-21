"use client";
import styles from "../_assets/scss/about.module.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaSquareGithub } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const about     = useRef<HTMLDivElement>(null);
    const content   = useRef<HTMLDivElement>(null);
    const portrait  = useRef<HTMLDivElement>(null);
    const bio       = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.from(content.current, {
            scrollTrigger: {
                trigger: about.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: true
            },
            opacity: 0,
            y: 60,
            ease: 'power3.out',
        });
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set(content.current, { clearProps: "all" });
        };
    }, []);

    return (
        <div className={styles.about} ref={about}>
            <div className={styles.container}>
                <h2>About Me</h2>
                <div className={styles.wrapper} ref={content}>
                    <div className={styles.overlay}></div>
                    <div className={styles.info}>
                        <div className={styles.portrait}>
                            <img className={styles.picture} src="/portrait.jpg" alt="Claude-Marc Joseph" />
                        </div>
                        <div className={styles.bio}>
                            <div className={styles.inner_bio}>
                                <div className={styles.name}>
                                    Claude-Marc Joseph
                                    <span className={styles.role}>Movie critic & Senior Web developer</span>
                                </div>
                                <div className={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus molestias unde accusantium illo ullam quaerat praesentium dolorum. Excepturi dolorum eaque, ex cumque aut nulla voluptatibus doloremque, obcaecati est voluptatum quaerat?</div>
                                <div className={styles.socials}>
                                    <h3>Socials</h3>
                                    <div className={styles.inner}>
                                        <Link className="facebook" href="http://www.facebook.com" target="_blank"><FaFacebookSquare /></Link>
                                        <Link className="x" href="http://www.x.com" target="_blank"><FaXTwitter /></Link>
                                        <Link className="instagram" href="http://www.instagram.com" target="_blank"><GrInstagram /></Link>
                                        <Link className={styles.github} href="https://github.com/cmjoseph" target="_blank"><FaSquareGithub /></Link>
                                        <Link className={styles.email} href="mailto:cmarcjoseph@gmail.com" target="_blank"><AiOutlineMail /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
