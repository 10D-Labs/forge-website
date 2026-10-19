import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HomeScrollHandler from "@/components/HomeScrollHandler";
import StoreLinks from "@/components/home/StoreLinks";
import ProductTour from "@/components/home/ProductTour";
import FAQAccordion from "@/components/home/FAQAccordion";
import HeroTilt from "@/components/home/HeroTilt";
import { pricing, pricingAnswer } from "@/content/pricing";
import { APP_NAME } from "@/config/app";

export const metadata: Metadata = {
  title: { absolute: APP_NAME },
  description: "Walk into your next workout with a plan. Forge builds your training around your goals and schedule, with four AI coaches to choose from. On iOS and Android.",
  alternates: { canonical: "https://forgetrainer.ai/", types: { "text/markdown": "/markdown/home.md" } },
};

const coaches = [
  { name: "Sergeant Stone", slug: "sergeant-stone", style: "The push you came for.", description: "Direct coaching for days when you need a firm push.", image: "sergeant-stone-portrait.webp", tag: "Tough love" },
  { name: "Maya", slug: "maya", style: "Someone who gets it.", description: "Patient encouragement to help you build confidence.", image: "maya-portrait.webp", tag: "Supportive" },
  { name: "Mike", slug: "mike", style: "Good company. Good reps.", description: "Easygoing coaching with a sense of humor.", image: "mike-portrait.webp", tag: "Laid-back" },
  { name: "Reese", slug: "reese", style: "Every detail counts.", description: "Focused guidance for people who want to understand their training.", image: "reese-portrait.webp", tag: "Technique-focused" },
];

const faqs = [
  { question: "What does Forge do?", answer: "Forge builds workout plans around your goals, experience, schedule, and available equipment. You can log your training, track progress, and ask your AI coach questions along the way." },
  { question: "Can I use it as a beginner?", answer: "Yes. Tell your coach your experience level when you get started. Your plan includes exercises with instructions, and you can ask for help understanding your workout." },
  { question: "Do I need a gym membership?", answer: "You can train at a gym or at home. Tell Forge which equipment you have so your coach can plan around it." },
  { question: "Are the coaches real people?", answer: "The four Forge coaches are AI characters with distinct coaching styles. Choose the approach you prefer and switch coaches in the app." },
  { question: "How much does it cost?", answer: pricingAnswer },
  { question: "Where can I download it?", answer: `${APP_NAME} is available on iPhone and Android. Use the App Store or Google Play links on this page, or search for the full app name in your store.` },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://forgetrainer.ai/#organization", name: "Forge", url: "https://forgetrainer.ai", logo: "https://forgetrainer.ai/icon-512.png", sameAs: ["https://www.instagram.com/forgetrainerapp", "https://www.tiktok.com/@forgetrainerapp"] },
    { "@type": "WebSite", name: "Forge", url: "https://forgetrainer.ai", publisher: { "@id": "https://forgetrainer.ai/#organization" } },
    { "@type": "SoftwareApplication", name: APP_NAME, applicationCategory: "HealthApplication", operatingSystem: ["iOS", "Android"], description: "Personal workout plans with AI coaching and progress tracking.", offers: pricing.plans.map((plan) => ({ "@type": "Offer", name: `${plan.name} subscription`, price: plan.price, priceCurrency: pricing.currency, description: `${pricing.trialDays}-day free trial, then $${plan.price} per ${plan.period}.`, priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: pricing.currency, billingDuration: plan.billingDuration } })) },
    { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ],
};

export default function HomePage() {
  return <main className="forge-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Suspense fallback={null}><HomeScrollHandler /></Suspense>

    <section className="home-hero" aria-labelledby="hero-heading">
      <div className="site-width hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Personal training, built around you</p>
          <h1 id="hero-heading">Get stronger.<br />Train with<br /><span>confidence.</span></h1>
          <p className="hero-description">You want to feel good in your body. Forge helps you work toward it with a workout plan that fits your life and a coach who knows where you're starting.</p>
          <div id="hero-badges" className="hero-download"><StoreLinks /><p>{APP_NAME}<br />{pricing.trialDays}-day free trial</p></div>
        </div>
        <div className="hero-visual hero-visual-home">
          <HeroTilt><Image src="/app-mockup-hero.webp" width={1620} height={2880} quality={90} alt="Forge Home on iPhone, showing today's workout and a message from your coach" sizes="(max-width: 600px) calc(100vw - 40px), 360px" priority /></HeroTilt>
        </div>
      </div>
      <div className="site-width hero-footnote"><span>YOUR GOALS SET THE DIRECTION.</span><span>FORGE BUILDS THE PLAN.</span></div>
    </section>

    <section id="your-start" className="starting-section section-space" aria-labelledby="starting-heading">
      <div className="site-width starting-layout">
        <div><p className="eyebrow">You don't have to have it figured out</p><h2 id="starting-heading">Start where<br /><span className="text-primary">you</span> are.</h2><p>Build strength for the life you want to live. Your experience and your schedule give us a place to start.</p><a href="/download" className="text-link">Get your plan in Forge</a></div>
        <div className="starting-points">
          <article><span>01</span><div><h3>“I don't know what to do.”</h3><p>Walk into each session with your exercises and targets ready. Ask your coach when you need help.</p></div></article>
          <article><span>02</span><div><h3>“I want to feel strong again.”</h3><p>Tell Forge where you're starting now. Build a routine around your current experience.</p></div></article>
          <article><span>03</span><div><h3>“Life keeps getting in the way.”</h3><p>Plan around the days you have and the equipment you can use, at home or in the gym.</p></div></article>
          <article><span>04</span><div><h3>“I'm ready to make more progress.”</h3><p>Keep a record of what you lift. Review your training and talk through your next step with your coach.</p></div></article>
        </div>
      </div>
    </section>

    <ProductTour />

    <section id="trainers" className="coaches-section section-space" aria-labelledby="coaches-heading">
      <div className="site-width">
        <div className="section-heading"><div><p className="eyebrow"><span>02</span> Find your coach</p><h2 id="coaches-heading">Same commitment.<br /><span className="muted-heading">Your kind of coaching.</span></h2></div><p>Four AI personalities. Choose the one you want to hear from when it's time to train.</p></div>
        <div className="coach-grid">{coaches.map((coach) => <Link className="coach-card" key={coach.slug} href={`/trainers/${coach.slug}`}>
          <div className="coach-image"><Image src={`/trainers/${coach.image}`} alt={`${coach.name}, a Forge AI coach`} width={500} height={500} sizes="(max-width: 600px) 45vw, (max-width: 900px) 40vw, 25vw" /><span className="coach-tag">{coach.tag}</span></div>
          <div className="coach-info"><div><h3>{coach.name}</h3></div><p>{coach.description}</p></div>
        </Link>)}</div>
        <p className="coaches-note">Pick a style that works for you. You can switch coaches in the app.</p>
      </div>
    </section>

    <section className="resources-section section-space" aria-labelledby="resources-heading">
      <div className="site-width resources-layout">
        <div><p className="eyebrow"><span>03</span> Keep learning</p><h2 id="resources-heading">A little knowledge.<br />A better session.</h2><p>Explore the exercise library or work out your next lifting target. These resources are free to use.</p></div>
        <div className="resource-links">
          <Link href="/exercises"><span><small>Learn the movement</small>Exercise library</span><ArrowRight aria-hidden="true" /></Link>
          <Link href="/tools"><span><small>Do the numbers</small>Workout calculators</span><ArrowRight aria-hidden="true" /></Link>
          <Link href="/blog"><span><small>Understand your training</small>Blog</span><ArrowRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>

    <section className="home-faq section-space" aria-labelledby="faq-heading">
      <div className="site-width faq-layout">
        <div><p className="eyebrow"><span>04</span> Before you start</p><h2 id="faq-heading">Good<br /> questions.</h2><p>Need something else?<br /><a className="text-link" href="mailto:support@forgetrainer.ai">Talk to the team</a></p></div>
        <FAQAccordion items={faqs} />
      </div>
    </section>

    <section className="home-cta" aria-labelledby="download-heading">
      <div className="site-width cta-layout"><div><p className="eyebrow">Your next workout starts here</p><h2 id="download-heading">Make it<br />your own.</h2></div><div className="cta-copy"><p>Bring your goals.<br />We'll help you build the plan.</p><StoreLinks placement="cta-bottom" /><span>{APP_NAME} · iOS and Android</span></div></div>
    </section>
  </main>;
}
