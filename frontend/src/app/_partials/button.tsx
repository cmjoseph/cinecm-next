"use client";
import Link from "next/link";
import styles from "../_assets/scss/button.module.scss";

export default function Button(params: { url: string; text: string, external: boolean }) {
    return (
        <Link className={styles.link} href={params.url} target={params.external ? '_blank' : '_self'}><span>{params.text}</span></Link>
    )
}