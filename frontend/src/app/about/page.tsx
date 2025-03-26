import styles from "../_assets/scss/page.module.scss";
import Image from "next/image";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - About',
    };
}

export default async function Page() {
    return (
        <div className={styles.about}>
            <h1>About</h1>
            <Image
                src="/images/slider/placeholder04.webp"
                width={1920}
                height={1080}
                alt="Placeholder 04"
                priority={true}
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    )
}