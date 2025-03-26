import styles from "../_assets/scss/page.module.scss";
import Image from "next/image";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - News',
    };
}

export default function Page() {
    return (
        <div className={styles.news}>
            <h1>News</h1>
            <Image
                src="/images/slider/placeholder03.webp"
                width={1920}
                height={1080}
                alt="Placeholder 03"
                priority={true}
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    )
}