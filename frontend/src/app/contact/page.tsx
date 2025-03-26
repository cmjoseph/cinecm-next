import styles from "../_assets/scss/page.module.scss";
import Image from "next/image";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Contact',
    };
}

export default function Page() {
    return (
        <div className={styles.contact}>
            <h1>Contact</h1>
            <Image
                src="/images/slider/placeholder05.webp"
                width={1920}
                height={1080}
                alt="Placeholder 05"
                priority={true}
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    )
}