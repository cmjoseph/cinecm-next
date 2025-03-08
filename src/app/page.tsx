import SliderHome from "./_components/slider";
import Upcoming from "./_components/upcoming";
import About from "./_components/about";
import More from "./_components/more";
import { movies } from "./_hooks/data";
import styles from "./_assets/scss/page.module.scss";

export default function Home() {
  	return (
		<div className={styles.home}>
			<SliderHome reviews={movies} />
			<Upcoming items={movies} />
			<About />
			<More reviews={movies} />
		</div>
	);
}
