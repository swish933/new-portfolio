import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/newsreader";
import "@fontsource-variable/newsreader/standard-italic.css";
import "@fontsource-variable/jetbrains-mono";
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
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
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
