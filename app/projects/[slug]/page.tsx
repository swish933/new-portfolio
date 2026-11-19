import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, profile } from "@/lib/content";
import { Arrow } from "@/components/icons";
import { ProjectArt } from "@/components/project-art";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  return {
    title: p ? `${p.title} — Project study` : "Project not found",
    description: p?.summary,
  };
}
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getProject(p.next)!;
  return (
    <main id="main" className="case-study">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/#work">Work</Link>
          <span>/</span>
          <span aria-current="page">{p.title}</span>
        </nav>
        <header className="case-hero">
          <div className="eyebrow">
            <span>Project {p.index}</span>
            <span>{p.category}</span>
          </div>
          <p className="case-name">{p.title}</p>
          <h1>
            {p.heading.split("\n").map((line, i) => (
              <span key={line} className={i === 1 ? "serif-italic" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <div className="case-intro-row">
            <p>{p.summary}</p>
            <a href={p.url} target="_blank" rel="noreferrer" className="button">
              Visit live site <Arrow />
            </a>
          </div>
          <div className="case-meta">
            <div>
              <span className="eyebrow">My role</span>
              <p>{p.role}</p>
            </div>
            <div>
              <span className="eyebrow">Technology</span>
              <p>{p.stack.join(" · ")}</p>
            </div>
            <div>
              <span className="eyebrow">Project type</span>
              <p>{p.category.split(" · ")[0]}</p>
            </div>
          </div>
        </header>
        <ProjectArt slug={p.slug} large />
        <section className="case-section">
          <div className="case-section-label">
            <span className="eyebrow">01 / The purpose</span>
            <h2>
              {p.slug === "co-invest"
                ? "Two audiences.\nA shared opportunity."
                : p.slug === "eventful"
                  ? "Two journeys.\nOne event."
                  : "A clear purpose.\nA focused experience."}
            </h2>
          </div>
          <div className="case-body">
            <p className="case-lead">{p.problem}</p>
            <ul className="plain-list">
              {p.capabilities.map((c) => (
                <li key={c}>
                  <span>↗</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="case-section">
          <div className="case-section-label">
            <span className="eyebrow">02 / My contribution</span>
            <h2>What I built.</h2>
          </div>
          <div className="case-body numbered-list">
            {p.contribution.map((c, i) => (
              <div key={c}>
                <span className="eyebrow">0{i + 1}</span>
                <p>{c}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <section className="case-architecture section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 / Under the surface</span>
              <h2>How it fits together.</h2>
            </div>
            <p className="section-description">
              The main parts of the application and the responsibilities each
              one handles.
            </p>
          </div>
          <div
            className={`architecture-grid architecture-${p.architecture.length}`}
          >
            {p.architecture.map((a, i) => (
              <article key={a.title}>
                <span className="eyebrow">Layer 0{i + 1}</span>
                <h3>{a.title}</h3>
                <p className="architecture-tech">{a.tech}</p>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
          {p.slug === "eventful" && (
            <div className="workflow-grid">
              <div>
                <span className="eyebrow">Attendee journey</span>
                <ol>
                  <li>Choose an event</li>
                  <li>Pay through hosted checkout</li>
                  <li>View the order and QR code</li>
                </ol>
              </div>
              <div>
                <span className="eyebrow">Reminder workflow</span>
                <ol>
                  <li>Schedule an event or personal reminder</li>
                  <li>Queue the job with BullMQ and Redis</li>
                  <li>Run the worker to dispatch an email</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="shell">
        <section className="case-section">
          <div className="case-section-label">
            <span className="eyebrow">04 / Engineering perspective</span>
            <h2>
              Decisions behind
              <br />
              the interface.
            </h2>
          </div>
          <div className="case-body decisions">
            {p.decisions.map((d) => (
              <article key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="project-outro">
          <span className="eyebrow">Explore the project</span>
          <h2>See it in context.</h2>
          <div className="actions">
            <a href={p.url} target="_blank" rel="noreferrer" className="button">
              Visit {p.title} <Arrow />
            </a>
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(`Let’s talk about ${p.title}`)}`}
              className="text-link"
            >
              Ask me about the build <Arrow />
            </a>
          </div>
        </section>
        <Link className="next-project" href={`/projects/${next.slug}/`}>
          <div>
            <p className="eyebrow">Up next / Project {next.index}</p>
            <h2>{next.title}</h2>
            <p>{next.category}</p>
          </div>
          <Arrow direction="right" />
        </Link>
        <div className="back-work">
          <Link href="/#work" className="text-link">
            <Arrow direction="left" /> All selected work
          </Link>
        </div>
      </div>
    </main>
  );
}
