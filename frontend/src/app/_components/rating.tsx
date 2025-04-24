"use client";
import styles from "../_assets/scss/rating.module.scss";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Rating({rate}: any) {
  	const rateRef = useRef<HTMLDivElement>(null);
	let rate_color = null;
	
	if (rate >= 95) {
        rate_color = styles.spectacular;
    } else if (rate <= 94 && rate >= 80 ) {
        rate_color = styles.great;
    } else if (rate <= 79 && rate >= 65 ) {
        rate_color = styles.average;
    } else if (rate <= 64 && rate >= 50 ) {
        rate_color = styles.horrible;
    } else {
        rate_color = styles.mediocre;
    }
	  
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
		<div ref={rateRef} className={`${styles.ratebox} ${rate_color}`}><span className={styles.rate}>{rate}%</span></div>
	);
}
