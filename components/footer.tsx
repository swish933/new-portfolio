import Link from "next/link";
import { profile } from "@/lib/content";
import { Arrow } from "./icons";
export function Footer() {
	return (
		<footer className='site-footer'>
			<div className='shell footer-top'>
				<div>
					<Link href='/' className='footer-name'>
						Joseph Ikem
					</Link>
					<p>Thoughtful interfaces. Solid systems.</p>
				</div>
				<div className='footer-links'>
					<a href={profile.github} target='_blank' rel='noreferrer'>
						GitHub <Arrow />
					</a>
					<a href={profile.linkedin} target='_blank' rel='noreferrer'>
						LinkedIn <Arrow />
					</a>
					<a href='#top'>Back to top ↑</a>
				</div>
			</div>
			<div className='shell footer-bottom'>
				<span>© {new Date().getFullYear()} Joseph Ikem</span>
				<span>Lagos, Nigeria · UTC+1</span>
				<span>Built with care, across the stack.</span>
			</div>
		</footer>
	);
}
