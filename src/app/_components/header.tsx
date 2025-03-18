"use client";
import styles from "../_assets/scss/header.module.scss";
import variables from '../_assets/scss/_variables.module.scss';
import Link from "next/link";
import Image from "next/image";
import { usePathname  } from "next/navigation";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";

export default function Header() {
    const pathname                  = usePathname();
    const [menuOpen, setMenuOpen]   = useState(false);
    const menuItemsRef              = useRef<HTMLDivElement[]>([]);
    const toggleClass = (e: any) => {
        if (menuOpen === false) {
            setMenuOpen(true);
            e.target.className = 
            gsap.fromTo(menuItemsRef.current, { y: -20, opacity: 0 }, { duration: 0.5, y: 0, opacity: 1, stagger: 0.2, ease: 'power3.out' });
        } else {
            setMenuOpen(false);
            gsap.fromTo(menuItemsRef.current, { y: 0, opacity: 1 }, { duration: 0.5, y: -20, opacity: 0, ease: 'power3.out' });
        }
    }

    console.log(menuOpen);
    return (
        <header className={styles.header}>
            <div className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                <div className={styles.nav__logo}>
                    <Link href="/" className={styles.logo} style={{ color: variables.primaryColor }}>
                        <Image
                            src='/svg/capture.svg'
                            width={40}
                            height={40}
                            alt='CineCM'
                            priority={true}
                            style={{ width: "100%"}}
                            className={styles.logo_svg}
                        />
                        <span className={styles.logo_name}>CINECM</span>
                    </Link>
                </div>
                <div className={styles.nav__menu}>
                    <Link ref={(el: any) => { if (menuItemsRef.current) {(menuItemsRef.current[0] = el)} }} className={pathname == "/reviews" ? styles.active : ""} href="/reviews">Reviews</Link>
                    <Link ref={(el: any) => { if (menuItemsRef.current) {(menuItemsRef.current[1] = el)} }} className={pathname == "/news" ? styles.active : ""} href="/news">News</Link>
                    <Link ref={(el: any) => { if (menuItemsRef.current) {(menuItemsRef.current[2] = el)} }} className={pathname == "/about" ? styles.active : ""} href="/about">About</Link>
                    <Link ref={(el: any) => { if (menuItemsRef.current) {(menuItemsRef.current[3] = el)} }} className={pathname == "/contact" ? styles.active : ""} href="/contact">Contact</Link>
                </div>
                <div className={styles.nav__socials} ref={(el: any) => { if (menuItemsRef.current) {(menuItemsRef.current[4] = el)} }}>
                    <Link href="http://www.facebook.com" target="_blank"><FaFacebookSquare /></Link>
                    <Link href="http://www.x.com" target="_blank"><FaXTwitter /></Link>
                    <Link href="http://www.instagram.com" target="_blank"><GrInstagram /></Link>
                    <Link href="#" onClick={()=> console.log('allo')}><FaSearch /></Link>
                </div>
            </div>
            <div className={`${styles.burger} ${menuOpen ? styles.open : ''}`} onClick={(e) => toggleClass(e)}>
                <VscMenu className={styles.burger_close} />
                <GrClose className={styles.burger_open} />
            </div>
        </header>
    );
}
