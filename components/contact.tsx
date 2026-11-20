"use client";
import { useState } from "react";
import { profile } from "@/lib/content";
import { Arrow } from "./icons";
export function Contact() {
	const [status, setStatus] = useState("");
	async function copy() {
		try {
			await navigator.clipboard.writeText(profile.email);
			setStatus("Email copied.");
		} catch {
			setStatus(`You can copy it here: ${profile.email}`);
		}
	}
	return (
		<section id='contact' className='contact-section section'>
			<div className='shell contact-grid'>
				<div>
					<p className='eyebrow'>05 / Get in touch</p>
					<h2>
						Have a role or
						<br />
						project in mind?
					</h2>
					<p className='section-description'>
						I’m open to full-stack and frontend roles, as well as select
						contract work. Let’s talk about what you’re building.
					</p>
					<div className='actions'>
						<a className='button' href={`mailto:${profile.email}`}>
							Send an email <Arrow />
						</a>
						<button type='button' className='button secondary' onClick={copy}>
							Copy email <span aria-hidden='true'>⧉</span>
						</button>
					</div>
					<p className='copy-status' role='status'>
						{status}
					</p>
				</div>
				<div className='contact-ledger'>
					<div className='ledger-heading'>
						<span>Open a conversation</span>
						<span>Lagos / Remote</span>
					</div>
					{[
						{
							name: "Email",
							value: profile.email,
							url: `mailto:${profile.email}`,
						},
						{
							name: "GitHub",
							value: "github.com/swish933",
							url: profile.github,
						},
						{
							name: "LinkedIn",
							value: "linkedin.com/in/ikemnomso",
							url: profile.linkedin,
						},
					].map((link) => (
						<a
							key={link.name}
							href={link.url}
							target={link.name === "Email" ? undefined : "_blank"}
							rel='noreferrer'
						>
							<span>
								<small>{link.name}</small>
								{link.value}
							</span>
							<Arrow />
						</a>
					))}
					<a href={profile.resume} download>
						<span>
							<small>Experience & qualifications</small>Download résumé (PDF)
						</span>
						<Arrow direction='down' />
					</a>
				</div>
			</div>
		</section>
	);
}
