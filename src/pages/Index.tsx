import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { HeroSection } from "@/components/hero";
import { SocialProofBar } from "@/components/sections";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { useScrollToElement } from "@/hooks/useScrollToElement";

// Lazy load below-fold sections for faster initial paint
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const HowItWorksSection = lazy(() => import("@/components/sections/HowItWorksSection"));
const ProblemSection = lazy(() => import("@/components/ProblemSection"));
const MeetTheTrainersSection = lazy(() => import("@/components/sections/MeetTheTrainersSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CTASection = lazy(() => import("@/components/CTASection"));

// Minimal loading fallback (invisible, prevents layout shift)
const SectionFallback = () => <div className="min-h-[200px]" />;

const homepageFAQs = [
  {
    question: "How much does a personal trainer cost?",
    answer:
      "Traditional personal trainers typically charge $50-150 per session, or $300-500 per month for regular training. That puts quality fitness guidance out of reach for most people. Forge provides the same personalized workout plans, real-time coaching, and accountability for a fraction of that cost.",
  },
  {
    question: "What is Forge?",
    answer:
      "Forge is a personal trainer in your pocket. It creates custom workout plans based on your goals, fitness level, schedule, and available equipment. You get real-time coaching during workouts, 24/7 support for any fitness questions, and accountability features that keep you consistent - all for a fraction of traditional personal training costs.",
  },
  {
    question: "How is Forge different from other fitness apps?",
    answer:
      "Apps like Fitbod use fatigue-based algorithms that often suggest illogical exercise combinations. Forge is different: it uses periodized programming with progressive overload to systematically increase your weights week over week. It remembers your complete history — including injuries — and auto-substitutes exercises you can't do. The AI can explain WHY it's programming each exercise, so you understand the logic. Plus, choose from four trainer personalities.",
  },
  {
    question: "How does Forge help with exercise form?",
    answer:
      "Every exercise includes detailed instructions, form cues, and common mistakes to avoid. You can ask your AI trainer questions like 'How do I keep my back straight during deadlifts?' and get specific guidance. No filming required - Forge teaches proper form through clear explanations you can reference anytime, even mid-workout.",
  },
  {
    question: "Can I choose my trainer's personality?",
    answer:
      "Yes! Forge offers four distinct AI trainers: Sergeant Stone for tough love and no excuses, Maya for supportive and encouraging guidance, Mike for a casual gym buddy vibe, and Reese for data-driven technical coaching. You can switch trainers anytime to find the style that motivates you best.",
  },
  {
    question: "What if I have injuries or limitations?",
    answer:
      "Forge remembers every injury you tell it — shoulder issues, bad back, knee problems, all of it. Unlike human trainers who forget or apps that ignore your settings, Forge automatically programs around your limitations. It substitutes exercises you can't do and never suggests movements that would aggravate old injuries. You'll never have to explain your history again.",
  },
];

const Index = () => {
  const location = useLocation();
  const { scrollToElement } = useScrollToElement();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("scrollTo") === "waitlist") {
      setTimeout(() => {
        scrollToElement('waitlist', { center: true });
      }, 100);
    }
  }, [location.search, scrollToElement]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Forge - Build The Body You've Always Wanted"
        description="Ready to transform? Forge combines AI coaching with expert guidance to help you build strength, confidence, and the body you've always wanted. Start today."
        canonicalPath="/"
        keywords="AI personal trainer, custom workout plans, AI fitness coach, virtual personal trainer, affordable fitness coaching, 24/7 workout guidance, personalized exercise plans"
        markdownUrl="/markdown/home.md"
      />
      <StructuredData
        type="organization"
        name="Forge"
        url="https://forgetrainer.ai"
        logo="https://forgetrainer.ai/icon-512.png"
        description="Forge is an AI-powered personal trainer that delivers custom workout plans and 24/7 fitness guidance at a fraction of the cost of traditional personal training."
        sameAs={[
          "https://www.instagram.com/forgetrainer",
          "https://www.tiktok.com/@forgetrainer",
        ]}
      />
      <StructuredData type="website" name="Forge" url="https://forgetrainer.ai" />
      <StructuredData
        type="softwareApplication"
        name="Forge"
        alternateName="Forge Personal Trainer"
        applicationCategory="HealthApplication"
        applicationSubCategory="Personal Training"
        operatingSystem={["iOS", "Android"]}
        description="Affordable personal trainer in your pocket. Get custom workout plans, real-time coaching, and 24/7 guidance for a fraction of traditional personal training costs. Perfect for people who want expert fitness guidance but can't afford $300-500/month trainer fees."
        offers={{
          price: "0",
          priceCurrency: "USD",
          description: "Join waitlist to be notified at launch",
        }}
        featureList={[
          "Custom workout plans tailored to your goals",
          "24/7 personal training guidance",
          "Multiple trainer personalities to match your style",
          "Progress tracking and accountability",
          "Exercise form guidance",
          "Workout scheduling and reminders",
        ]}
        audienceType="People seeking affordable personal training, gym beginners who need guidance, busy professionals who can't schedule trainer sessions"
        keywords="personal trainer, fitness coach, workout guidance, affordable training, fitness app"
        datePublished="2025-12-17"
      />

      <Header />

      <main role="main" itemScope itemType="https://schema.org/WebPage">
        {/* Hero - Primary conversion point (not lazy - critical for FCP/LCP) */}
        <HeroSection />

        {/* Social Proof - Build trust immediately (small, keep eager) */}
        <SocialProofBar />

        {/* Below-fold sections - lazy loaded for performance */}
        <Suspense fallback={<SectionFallback />}>
          <FeaturesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <HowItWorksSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <ProblemSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <MeetTheTrainersSection />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <FAQSection
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about personal training with Forge"
            questions={homepageFAQs}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <CTASection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
