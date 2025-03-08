import "./_assets/scss/_reset.scss";
import "./_assets/scss/_globals.scss";
import type { Metadata } from "next";
import Header from "./_components/header";
import Footer from "./_components/footer";
import { joreg } from "./fonts";
import { ReactLenis } from 'lenis/react';

export const metadata: Metadata = {
	title: "CMSCOPE - Home",
	description: "Movie Critic Extraordinaire",
};

export default function RootLayout({children}: { children: React.ReactNode }) {
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
