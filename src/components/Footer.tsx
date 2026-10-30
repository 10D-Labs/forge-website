import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { APP_NAME } from "@/config/app";

export default function Footer() {
  return <footer className="site-footer">
    <div className="site-width">
      <div className="footer-top">
        <div><Link href="/" className="footer-logo" aria-label="Forge home"><Image src="/forge-logo.png" alt={`${APP_NAME} logo`} width={48} height={48} /></Link><p>Personal training.<br />Built around you.</p></div>
        <nav aria-label="Explore Forge"><span className="eyebrow">Explore</span><Link href="/#trainers">Meet your coaches</Link><Link href="/ai-workout-planner">AI workout planner</Link><Link href="/compare">Compare Forge</Link><a href="/download">Get the app</a></nav>
        <nav aria-label="Training resources"><span className="eyebrow">Keep learning</span><Link href="/exercises">Exercise library</Link><Link href="/tools">Free tools</Link><Link href="/blog">Blog</Link></nav>
        <nav aria-label="Connect with Forge"><span className="eyebrow">Say hello</span><a href="mailto:support@forgetrainer.ai">Get in touch</a><a href="https://www.instagram.com/forgetrainerapp" target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://www.tiktok.com/@forgetrainerapp" target="_blank" rel="noopener noreferrer">TikTok <ArrowUpRight size={14} aria-hidden="true" /></a></nav>
      </div>
      <div className="footer-signoff" aria-hidden="true">FORGE YOURSELF.</div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} 10D Labs, LLC. Forge™</p><nav aria-label="Legal links"><Link href="/support">Support</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms-of-service">Terms</Link><Link href="/delete-account">Delete account</Link></nav><span>Built for your next workout.</span></div>
    </div>
  </footer>;
}
