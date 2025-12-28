import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import forgeLogo from "@/assets/forge-logo.png";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/blog", label: "Blog" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
      window.scrollTo({ top: middle, behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/?scrollTo=waitlist");
    } else {
      scrollToWaitlist();
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
      role="banner"
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2" aria-label="Forge - Home">
          <img 
            src={forgeLogo} 
            alt="Forge - AI Personal Trainer" 
            className="h-8 md:h-10 w-auto"
            width="100"
            height="40"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 md:gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              aria-current={location.pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/#waitlist"
            onClick={handleWaitlistClick}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
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

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`sm:hidden bg-background border-t border-border/50 overflow-hidden transition-all duration-300 ease-out ${
          isMenuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="container py-4 flex flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              aria-current={location.pathname === link.href ? "page" : undefined}
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
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex-1"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              Join Waitlist
            </a>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
