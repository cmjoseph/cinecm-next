import SliderHome from "./_components/slider";
import Upcoming from "./_components/upcoming";
import About from "./_components/about";
import More from "./_components/more";
import { movies } from "./_hooks/data";
import { fetchApi } from "../../utils/fetchApi";
import styles from "./_assets/scss/page.module.scss";

async function getContent() {
	const data = await fetchApi(`
		query {
			moviesEntries {
				... on movie_Entry {
					title
					url
					slug
					trailer
					id
					theBad
					theGood
					upcoming
					typeReview(label: false)
					reviewInFrench
					rating
					runtime
					description
					date
					status
					background {
						id
						filename
						path
					}
					poster {
						id
						filename
						path
					}
				}
			}
		}
	`);
	return data;
}

export default async function Home() {
	const content = await getContent();
  	return (
		<div className={`${styles.home} ${styles.page}`}>
			<SliderHome reviews={movies} />
			<Upcoming items={movies} />
			<About />
			<More reviews={content.data.moviesEntries} />
		</div>
	);
}
