import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

const forgeLogo = "/forge-logo.png";

const TikTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-forge-dark border-t border-border/50"
      role="contentinfo"
      itemScope
      itemType="https://schema.org/WPFooter"
    >
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-2" itemScope itemType="https://schema.org/Organization">
            <Link href="/" className="inline-block mb-4" aria-label="Forge - Home">
              <img
                src={forgeLogo}
                alt="Forge - AI Personal Trainer Logo"
                className="h-12 w-auto"
                loading="lazy"
                width="48"
                height="48"
                itemProp="logo"
              />
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed" itemProp="description">
              Your AI-powered personal trainer. Get custom workout plans, track your progress, and achieve your fitness goals — all for a fraction of the cost.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3 list-none">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Connect</h4>
            <div className="flex gap-4" role="list" aria-label="Social media links">
              <a
                href="https://www.instagram.com/forgeaitrainer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                aria-label="Follow Forge on Instagram"
                role="listitem"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@forgeaitrainer"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                aria-label="Follow Forge on TikTok"
                role="listitem"
              >
                <TikTokIcon />
              </a>
              <a
                href="mailto:support@forgetrainer.ai"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-all"
                aria-label="Email Forge support"
                role="listitem"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} 10D Labs, LLC. Forge™ and the Forge logo are trademarks of 10D Labs, LLC.
          </p>
          <nav aria-label="Legal links" className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
