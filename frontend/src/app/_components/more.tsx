"use client";
import styles from "../_assets/scss/more.module.scss";
import Movie from "../_partials/movie";

export default function More({reviews}: any) {
    return (
        <div className={styles.more}>
            <div className={styles.container}>
                <h2>More Reviews</h2>
                <Movie movies={reviews} />
            </div>
        </div>
    )
}
