import { Link, useLocation } from "react-router-dom";
import forgeLogo from "@/assets/forge-logo.png";

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={forgeLogo} alt="Forge" className="h-8 md:h-10 w-auto" />
        </Link>

        <nav className="flex items-center gap-6 md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#waitlist"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
          >
            Join Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
