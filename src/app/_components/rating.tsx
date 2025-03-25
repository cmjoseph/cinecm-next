"use client";
import styles from "../_assets/scss/rating.module.scss";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Rating({rate}: any) {
  	const rateRef = useRef<HTMLDivElement>(null);
	  
	useEffect(() => {
		if (rateRef.current) {
			let dist = (window.innerWidth <= 1440) ? -170 : -300;
			window.addEventListener('resize', ()=> {
				dist = (window.innerWidth <= 1440) ? -170 : -300;
			});
			gsap.fromTo(rateRef.current, { x: dist }, { duration: 1, x: 0, ease: 'power3.out', delay: 1 });
		}
	}, []);

	return (
		<div ref={rateRef} className={`${styles.ratebox} ${styles.mediocre}`}><span className={styles.rate}>{rate}</span></div>
	);
}
