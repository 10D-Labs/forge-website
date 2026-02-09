"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollToElement } = useScrollToElement();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/exercises", label: "Exercises" },
    { href: "/blog", label: "Blog" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/?scrollTo=waitlist");
    } else {
      scrollToElement('waitlist', { center: true });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-surface-0/90 backdrop-blur-lg border-b border-border-nav"
      role="banner"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link
          href="/"
          className="font-barlow-condensed text-xl md:text-2xl font-extrabold tracking-widest text-foreground hover:text-primary transition-colors"
          aria-label="Forge - Home"
        >
          FORGE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 md:gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-barlow text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary"
                  : "text-text-secondary"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#waitlist"
            onClick={handleWaitlistClick}
            className="inline-flex items-center justify-center px-5 py-2.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all btn-neon rounded-[14px]"
          >
            Join Waitlist
          </a>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden p-2 text-foreground"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation - CLS-safe with CSS Grid height animation */}
      <div
        id="mobile-menu"
        className="sm:hidden bg-surface-0 border-t border-border-nav grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{
          gridTemplateRows: isMenuOpen ? "1fr" : "0fr",
          opacity: isMenuOpen ? 1 : 0,
          // Contain layout to prevent affecting other elements
          contain: "layout style",
        }}
        aria-hidden={!isMenuOpen}
      >
        <div className="overflow-hidden">
        <nav className="container py-4 flex flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`font-barlow text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href
                  ? "text-primary"
                  : "text-text-secondary"
              }`}
              aria-current={pathname === link.href ? "page" : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <a
              href="/#waitlist"
              onClick={(e) => {
                closeMenu();
                handleWaitlistClick(e);
              }}
              className="inline-flex items-center justify-center px-5 py-2.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all flex-1 rounded-[14px]"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Join Waitlist
            </a>
            <ThemeToggle />
          </div>
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
