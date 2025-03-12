"use client";
import styles from "../_assets/scss/modal.module.scss";
import { jobold } from "../fonts";
import { useState } from 'react';

export default function ModalTrailer({videoId}: any) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className={`${styles.modal} ${ (open) ? styles.modal_active : ''}`}>
                <button className={`${styles.modal_btn_close} ${jobold.className}`} onClick={() => setOpen(false)}>
                    <span>Close</span>
                </button>
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={(open) ? 'https://www.youtube.com/embed/'+videoId+'?autoplay=1' : 'https://www.youtube.com/embed/'+videoId}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <button className={`${styles.modal_btn_open} ${jobold.className}`} onClick={() => setOpen(true)}>
                <span>Watch the trailer</span>
            </button>
        </>
    )
}