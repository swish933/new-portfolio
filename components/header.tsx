"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow } from "./icons";
import { profile } from "@/lib/content";
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    function close(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="Joseph Ikem, home">
          Joseph Ikem<span>Full-stack software engineer</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <a href={profile.resume} download className="resume-link">
            Download résumé <Arrow direction="down" />
          </a>
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {["Work", "About", "Contact"].map((label) => (
            <Link
              key={label}
              href={`/#${label.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {label}
              <Arrow direction="right" />
            </Link>
          ))}
          <a href={profile.resume} download onClick={() => setOpen(false)}>
            Download résumé <Arrow direction="down" />
          </a>
        </nav>
      )}
    </header>
  );
}
