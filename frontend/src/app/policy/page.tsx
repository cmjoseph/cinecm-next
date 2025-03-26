import styles from "../_assets/scss/page.module.scss";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Privacy Policy',
    };
}

export default async function Page() {
    return (
        <div className={styles.policy}>
            <h1>Privacy Policy</h1>
        </div>
    )
}