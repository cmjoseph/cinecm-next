import styles from "../../_assets/scss/page.module.scss";

export async function generateMetadata() {
    return {
        title: 'CMSCOPE - Reviews - Single',
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ singleId: string }>
}) {
    const singleId = (await params).singleId;
    return (
        <div className={styles.single}>
            <h1>Reviews Single {singleId}</h1>
        </div>
    )
}