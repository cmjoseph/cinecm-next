"use client";
import { jobold } from "../fonts";

const toggleClass = (e: any, className: string) => {
    e.classList.toggle(className);
}

export default function ShowTrailer() {
    return (
        <button className={jobold.className} onClick={(e)=> toggleClass(e.target, 'active')}>
            <span>Trailer</span>
        </button>
    )
}