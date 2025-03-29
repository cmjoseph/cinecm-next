import "./_assets/scss/_reset.scss";
import "./_assets/scss/_globals.scss";
import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { joreg } from "./fonts";
import { ReactLenis } from 'lenis/react';
import { fetchApi } from "../../utils/fetchApi";

export const metadata: Metadata = {
	title: "CMSCOPE - Home",
	description: "Movie Critic Extraordinaire",
};

async function getContent() {
    const data = await fetchApi(`
        query {
            reviewsEntries {
				... on movie_Entry {
					id
					title
				}
			}
        }
    `);
    return data;
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
	const content = await getContent();
	console.log(content);
  	return (
		<html lang="en">
			<body className={`${joreg.className}`}>
				<Header />
				<main>
					<ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
						{children}
					</ReactLenis>
				</main>
				<Footer />
			</body>
		</html>
  	);
}
