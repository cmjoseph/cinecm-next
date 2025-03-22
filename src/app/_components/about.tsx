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
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: about.current,
                end: "bottom 100%",
                scrub: true
            },
        });
        tl.from(portrait.current, { opacity: 0, x: -30, ease: 'power3.out', delay: 1  });
        tl.from(bio.current, { opacity: 0, x: 30, ease: 'power3.out', delay: 0.5 });
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            gsap.set([portrait.current, bio.current], { clearProps: "all" });
        };
    }, []);

    return (
        <div className={styles.about}>
            <div className={styles.container} ref={about}>
                <h2>About Me</h2>
                <div className={styles.wrapper}>
                    <div className={styles.overlay}></div>
                    <div className={styles.info}>
                        <div className={styles.info_inner} ref={portrait}>
                            <div className={styles.name}>Claude-Marc Joseph</div>
                            <div className={styles.role}>Movie critic & Senior Web developer</div>
                            <div className={styles.portrait}>
                                <img className={styles.picture} src="/portrait.jpg" alt="Claude-Marc Joseph" />
                            </div>
                        </div>
                        <div className={styles.bio} ref={bio}>
                            <div className={styles.inner_bio}>
                                <div className={styles.description}>
                                Claude-Marc Joseph is a dedicated senior front-end developer with a degree in Computer Science, specializing in creating visually appealing and user-friendly web applications. His programming skills are enhanced by a strong design sensibility, allowing him to craft seamless user interfaces. Outside of coding, he is a passionate cinephile, exploring and analyzing films, which inspires his creative approach to web development. Claude-Marc enjoys attending film festivals and tech meetups to connect with others who share his interests, and he remains committed to continuous learning, keeping abreast of trends in both the technology and film industries to merge his passions innovatively.
                                </div>
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
