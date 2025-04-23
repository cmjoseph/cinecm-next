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
            menuEntries {
				... on menuItem_Entry {
					id
					slug
					title
					item_url {
						target
						label
						link
					}
				}
			}
        }
    `);
    return data;
}

export default async function RootLayout({children}: { children: React.ReactNode }) {
	const content = await getContent();
	console.log(content.data.menuEntries);
  	return (
		<html lang="en">
			<body className={`${joreg.className}`}>
				<Header items={content.data.menuEntries}/>
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
