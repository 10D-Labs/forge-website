"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#how-it-works", label: "The app" },
  { href: "/#trainers", label: "Your coaches" },
  { href: "/exercises", label: "Exercises" },
  { href: "/tools", label: "Free tools" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape") { setIsOpen(false); toggle.current?.focus(); }
    }}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-width header-inner">
        <Link href="/" className="wordmark" aria-label="Forge home">
          <Image src="/forge-logo.png" alt="" width={40} height={40} />
          FORGE
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <a href="/download" className="forge-button header-download" onClick={() => setIsOpen(false)}>Get Forge</a>
          <span className="desktop-theme"><ThemeToggle /></span>
          <button ref={toggle} className="menu-toggle" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls={isOpen ? "mobile-navigation" : undefined} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {isOpen && <nav id="mobile-navigation" className="mobile-nav site-width" aria-label="Mobile navigation">
        {links.map(({ href, label }) => <Link key={href} href={href} onClick={() => setIsOpen(false)}>{label}</Link>)}
        <div className="mobile-theme"><span>Appearance</span><ThemeToggle /></div>
      </nav>}
    </header>
  );
}
