"use client";
import styles from "../_assets/scss/upcoming.module.scss";
import Coming from "../_partials/coming";

export default function Upcoming({items}: any) {
    return (
        <div className={styles.upcoming}>
            <div className={styles.container}>
                <h2>Upcoming Reviews</h2>
                <Coming items={items} />
            </div>
        </div>
    );
}
