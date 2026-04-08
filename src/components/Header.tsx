"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/exercises", label: "Exercises" },
    { href: "/blog", label: "Blog" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToHeroBadges = useCallback(() => {
    const badges = document.getElementById("hero-badges");
    if (!badges) return;

    badges.scrollIntoView({ behavior: "smooth", block: "center" });

    // Wait for scroll to finish before firing the pulse
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.removeEventListener("scroll", onScroll);
        badges.classList.add("badge-pulse");
        badges.addEventListener(
          "animationend",
          () => badges.classList.remove("badge-pulse"),
          { once: true }
        );
      }, 100);
    };

    // If already in view (no scroll happens), fire immediately after a short delay
    scrollTimeout = setTimeout(() => {
      window.removeEventListener("scroll", onScroll);
      badges.classList.add("badge-pulse");
      badges.addEventListener(
        "animationend",
        () => badges.classList.remove("badge-pulse"),
        { once: true }
      );
    }, 300);

    window.addEventListener("scroll", onScroll);
  }, []);

  const handleDesktopDownload = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === "/") {
        scrollToHeroBadges();
      } else {
        router.push("/");
        // Wait for navigation then scroll
        const check = () => {
          const badges = document.getElementById("hero-badges");
          if (badges) {
            scrollToHeroBadges();
          } else {
            requestAnimationFrame(check);
          }
        };
        // Start checking after a short delay for navigation
        setTimeout(check, 100);
      }
    },
    [pathname, router, scrollToHeroBadges]
  );

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
            href="/#hero-badges"
            onClick={handleDesktopDownload}
            className="inline-flex items-center justify-center px-5 py-2.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all btn-neon rounded-[14px] cursor-pointer"
          >
            Download
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
            <Link
              href="/download"
              onClick={closeMenu}
              className="inline-flex items-center justify-center px-5 py-2.5 font-barlow-condensed text-sm font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all flex-1 rounded-[14px]"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Download
            </Link>
            <ThemeToggle />
          </div>
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
