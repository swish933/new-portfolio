import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="shell missing">
      <p className="eyebrow">404 / Page not found</p>
      <h1>A small detour.</h1>
      <p>
        That page isn’t here. You can find my selected projects on the homepage.
      </p>
      <Link href="/" className="button">
        Return to portfolio →
      </Link>
    </main>
  );
}
