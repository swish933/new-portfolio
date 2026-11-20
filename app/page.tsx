import Link from "next/link";
import { Arrow } from "@/components/icons";
import { Strata } from "@/components/strata";
import { ProjectArt } from "@/components/project-art";
import { Contact } from "@/components/contact";
import { projects, experience } from "@/lib/content";
export default function Home() {
	return (
		<main id='main'>
			<section className='hero'>
				<div className='shell'>
					<div className='hero-top'>
						<p className='eyebrow'>
							<span className='status-dot' />
							Full-stack software engineer · Lagos, Nigeria
						</p>
						<span className='hero-index'>Portfolio / 2026</span>
					</div>
					<div className='hero-grid'>
						<div className='hero-copy'>
							<h1>
								Thoughtful
								<br />
								interfaces.
								<br />
								<em>Solid systems.</em>
							</h1>
							<p>
								I’m Joseph, a full-stack engineer. I build websites and
								applications with React, Next.js and Node.js, including the
								APIs, authentication and background processes behind them.
							</p>
							<div className='actions'>
								<a href='#work' className='button'>
									Explore my work <Arrow direction='down' />
								</a>
								<a href='#contact' className='button secondary'>
									Get in touch <Arrow direction='right' />
								</a>
							</div>
							<div className='hero-stack'>
								TypeScript <span>/</span> React <span>/</span> Next.js{" "}
								<span>/</span> Node.js
							</div>
						</div>
						<Strata />
					</div>
					<div className='hero-bottom'>
						<span>From the interface to the infrastructure.</span>
						<a href='#work'>
							Selected work below <Arrow direction='down' />
						</a>
					</div>
				</div>
			</section>
			<section id='work' className='section work-section'>
				<div className='shell'>
					<div className='section-heading'>
						<div>
							<p className='eyebrow'>01 / Selected applications</p>
							<h2>Work, across the stack.</h2>
						</div>
						<p className='section-description'>
							Applications built from the interface down to the APIs, data and
							background workflows.
						</p>
					</div>
					{projects.slice(0, 2).map((project) => (
						<article key={project.slug} className='featured-project'>
							<div className='project-title-row'>
								<span className='project-number'>{project.index} /</span>
								<div>
									<span className='eyebrow'>{project.category}</span>
									<h3>
										<Link href={`/projects/${project.slug}/`}>
											{project.title}
											<Arrow />
										</Link>
									</h3>
								</div>
								<span className='project-role'>{project.role}</span>
							</div>
							<div className='project-grid'>
								<div>
									<Link
										href={`/projects/${project.slug}/`}
										className='art-link'
										aria-label={`Read the ${project.title} case study`}
									>
										<ProjectArt slug={project.slug} />
									</Link>
									<p className='project-summary'>{project.summary}</p>
									<div className='actions'>
										<Link
											href={`/projects/${project.slug}/`}
											className='button small'
										>
											View case study <Arrow direction='right' />
										</Link>
										<a
											href={project.url}
											className='text-link'
											target='_blank'
											rel='noreferrer'
										>
											Live site <Arrow />
										</a>
									</div>
								</div>
								<aside className='project-rail'>
									<p className='eyebrow rail-heading'>
										What it brings together
									</p>
									{project.capabilities.map((text, i) => (
										<div className='capability' key={text}>
											<span className='eyebrow'>0{i + 1}</span>
											<p>{text}</p>
										</div>
									))}
									<div className='stack-block'>
										<span className='eyebrow'>Built with</span>
										<div className='tags'>
											{project.stack.map((t) => (
												<span key={t}>{t}</span>
											))}
										</div>
									</div>
								</aside>
							</div>
						</article>
					))}
				</div>
			</section>
			<section className='websites-section section'>
				<div className='shell'>
					<div className='section-heading'>
						<div>
							<p className='eyebrow'>02 / Client websites</p>
							<h2>A little more of the work.</h2>
						</div>
						<p className='section-description'>
							Business showcases and personal portfolios, built around the
							people who use them.
						</p>
					</div>
					<div className='website-grid'>
						{projects.slice(2).map((project) => (
							<article key={project.slug}>
								<Link
									href={`/projects/${project.slug}/`}
									className='art-link'
									aria-label={`View ${project.title}`}
								>
									<ProjectArt slug={project.slug} />
								</Link>
								<div className='website-title'>
									<h3>
										<Link href={`/projects/${project.slug}/`}>
											{project.title}
										</Link>
									</h3>
									<Link
										href={`/projects/${project.slug}/`}
										className='text-link'
									>
										View project <Arrow />
									</Link>
								</div>
								<p>{project.summary}</p>
								<div className='website-stack'>{project.stack.join(" / ")}</div>
							</article>
						))}
					</div>
				</div>
			</section>
			<section className='approach-section section'>
				<div className='shell'>
					<div className='section-heading'>
						<div>
							<p className='eyebrow'>03 / How I work</p>
							<h2>Care at every layer.</h2>
						</div>
						<p className='section-description'>
							The visible details matter. So do the systems that make them work.
						</p>
					</div>
					<div className='approach-grid'>
						{[
							{
								label: "Client side",
								title: "Interfaces & state",
								body: "Responsive layouts, reusable components and clear loading, empty and error states.",
							},
							{
								label: "Server side",
								title: "APIs & business logic",
								body: "Express services that connect the interface to application workflows and data.",
							},
							{
								label: "Identity",
								title: "Authentication & data",
								body: "Keycloak integration, role-aware experiences and structured application records.",
							},
							{
								label: "Background",
								title: "Jobs & integrations",
								body: "Scheduled reminders, email workflows and the third-party services behind the product.",
							},
						].map((item, i) => (
							<div className='approach-item' key={item.title}>
								<div className='eyebrow'>
									<span>0{i + 1}</span>
									<span>{item.label}</span>
								</div>
								<h3>{item.title}</h3>
								<p>{item.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<section id='about' className='section about-section'>
				<div className='shell about-grid'>
					<div>
						<p className='eyebrow'>04 / A little about me</p>
						<h2>
							Engineer by training.
							<br />
							<em>Builder by instinct.</em>
						</h2>
						<p className='about-intro'>
							I’m Joseph Ikem, a full-stack software engineer based in Lagos. My
							work spans client websites, business applications, authentication,
							APIs and background processing.
						</p>
						<p className='about-copy'>
							I enjoy following a problem across the stack: understanding what a
							user needs, working through the implementation, and getting the
							details right.
						</p>
						<div className='toolbox'>
							<p className='eyebrow'>Tools I work with</p>
							<div className='tags'>
								{[
									"TypeScript",
									"React",
									"Next.js",
									"Node.js",
									"Express",
									"MongoDB",
									"PostgreSQL",
									"Redis",
									"Keycloak",
									"Tailwind CSS",
									"Git",
									"Docker",
								].map((t) => (
									<span key={t}>{t}</span>
								))}
							</div>
						</div>
					</div>
					<div className='experience'>
						<div className='ledger-heading'>
							<span>Career experience</span>
							<span>2021 — Present</span>
						</div>
						{experience.map((job) => (
							<article className='experience-item' key={job.company}>
								<div>
									<h3>{job.role}</h3>
									<p className='company'>{job.company}</p>
									<span className='job-period'>{job.period}</span>
									<p>{job.body}</p>
								</div>
							</article>
						))}
						<div className='education'>
							<p className='eyebrow'>Education & learning</p>
							<p>
								<strong>B.Sc. Computer Engineering</strong>
								<br />
								Eastern Mediterranean University · 2018
							</p>
							<p>
								<strong>Backend Engineering Diploma</strong>
								<br />
								AltSchool Africa · 2024
							</p>
						</div>
					</div>
				</div>
			</section>
			<Contact />
		</main>
	);
}
