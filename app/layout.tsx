import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
	title: {
		default: "Nomso Ikem — Full-stack Software Engineer",
		template: "%s | Nomso Ikem",
	},
	description:
		"Nomso Ikem is a full-stack software engineer in Lagos, Nigeria, building thoughtful interfaces and solid systems with React, Next.js and Node.js.",
	openGraph: {
		title: "Nomso Ikem — Full-stack Software Engineer",
		description:
			"Selected applications, client websites, and the engineering behind them.",
		type: "website",
	},
	robots: { index: true, follow: true },
};

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

const gambarino = localFont({
	src: "./fonts/Gambarino-Regular.woff2",
	weight: "400",
	style: "normal",
	variable: "--font-gambarino",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={`${inter.variable} ${jetbrainsMono.variable} ${gambarino.variable}`}
		>
			<body id='top'>
				<a href='#main' className='skip-link'>
					Skip to content
				</a>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
