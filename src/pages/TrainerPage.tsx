import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { getTrainerBySlug, trainers } from "@/content/trainers";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { useScrollToElement } from "@/hooks/useScrollToElement";

const TrainerPage = () => {
  const { trainer: trainerSlug } = useParams<{ trainer: string }>();
  const trainer = trainerSlug ? getTrainerBySlug(trainerSlug) : undefined;
  const { scrollToElement } = useScrollToElement();

  if (!trainer) {
    return <Navigate to="/" replace />;
  }

  const handleWaitlistClick = () => {
    scrollToElement("trainer-cta", { center: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${trainer.name} - AI Personal Trainer | Forge`}
        description={`Meet ${trainer.name}, your ${trainer.role.toLowerCase()} AI personal trainer. ${trainer.description} Train with ${trainer.name} on Forge.`}
        canonicalPath={`/trainers/${trainer.slug}`}
        keywords={`${trainer.name}, AI personal trainer, ${trainer.role}, fitness coach, virtual trainer, ${trainer.vibe}`}
        markdownUrl={`/markdown/trainers/${trainer.slug}.md`}
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Trainers", url: "https://forgetrainer.ai/#trainers" },
          { name: trainer.name, url: `https://forgetrainer.ai/trainers/${trainer.slug}` },
        ]}
      />
      <StructuredData
        type="person"
        name={trainer.name}
        description={`${trainer.role} AI personal trainer. ${trainer.description}`}
        jobTitle="AI Personal Trainer"
        knowsAbout={trainer.trainingStyle?.slice(0, 3) || ["Fitness", "Personal Training", "Workout Planning"]}
        image={`https://forgetrainer.ai${trainer.avatarUrl}`}
        memberOf={{
          name: "Forge",
          url: "https://forgetrainer.ai",
        }}
        isVirtualCharacter={true}
      />

      <Header />

      <main className="pt-20" role="main">
        {/* Hero Section */}
        <section className="py-12 md:py-20 bg-surface-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-50" aria-hidden="true" />
          <div className="container relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-text-tertiary hover:text-primary transition-colors font-barlow text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Home
              </Link>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeInUp}
                  className="font-barlow-condensed text-label-lg text-primary uppercase tracking-wider mb-4"
                >
                  {trainer.role}
                </motion.p>
                <motion.h1
                  variants={fadeInUp}
                  className="font-barlow-condensed text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6"
                >
                  Meet <span className="text-primary text-neon">{trainer.name}</span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-xl text-text-secondary font-barlow mb-6"
                >
                  {trainer.fullDescription || trainer.description}
                </motion.p>
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center px-4 py-2 angular-border-sm [--angular-bg:hsl(var(--primary)/0.1)] [--angular-border-color:hsl(var(--primary)/0.3)]"
                >
                  <span className="text-sm font-barlow-condensed font-semibold text-primary uppercase tracking-wide relative z-10">
                    {trainer.vibe}
                  </span>
                </motion.div>
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <div
                    className="absolute inset-0 blur-3xl opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="relative p-1"
                    style={{
                      background: "hsl(24 100% 50% / 0.4)",
                      clipPath:
                        "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))",
                    }}
                  >
                    <img
                      src={trainer.avatarUrl}
                      alt={trainer.name}
                      width="280"
                      height="280"
                      className="w-56 h-56 md:w-72 md:h-72 object-cover"
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Training Style & Best For */}
        <section className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Training Style */}
              {trainer.trainingStyle && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={staggerContainer}
                >
                  <motion.h2
                    variants={fadeInUp}
                    className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-6"
                  >
                    Training Style
                  </motion.h2>
                  <ul className="space-y-3">
                    {trainer.trainingStyle.map((style, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary font-barlow">{style}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Best For */}
              {trainer.bestFor && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={staggerContainer}
                >
                  <motion.h2
                    variants={fadeInUp}
                    className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-6"
                  >
                    Best For
                  </motion.h2>
                  <ul className="space-y-3">
                    {trainer.bestFor.map((item, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-text-secondary font-barlow">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Sample Phrases */}
        {trainer.samplePhrases && (
          <section className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle">
            <div className="container">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
              >
                <motion.h2
                  variants={fadeInUp}
                  className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8"
                >
                  <MessageCircle className="w-6 h-6 inline-block mr-2 text-primary" />
                  What {trainer.name} Sounds Like
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {trainer.samplePhrases.map((phrase, index) => (
                    <motion.blockquote
                      key={index}
                      variants={fadeInUp}
                      className="p-5 angular-border [--angular-bg:hsl(var(--surface-2))]"
                    >
                      <p className="text-text-secondary font-barlow italic relative z-10">
                        "{phrase}"
                      </p>
                    </motion.blockquote>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section
          id="trainer-cta"
          className="py-12 md:py-16 bg-surface-1 border-t border-border-subtle"
        >
          <div className="container">
            <motion.div
              className="text-center max-w-2xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="font-barlow-condensed text-3xl md:text-4xl font-black uppercase mb-4"
              >
                Ready to Train with{" "}
                <span className="text-primary text-neon">{trainer.name}</span>?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-text-secondary font-barlow mb-8"
              >
                Join the Forge waitlist and be the first to train with {trainer.name} when
                we launch.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/?scrollTo=waitlist"
                  className="inline-flex items-center justify-center px-8 py-3 font-barlow-condensed text-base font-bold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-forge-orange-dark transition-all btn-neon"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  }}
                >
                  Join the Waitlist
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Other Trainers */}
        <section className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle">
          <div className="container">
            <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8">
              Meet Other Trainers
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers
                .filter((t) => t.slug !== trainer.slug)
                .map((t) => (
                  <Link
                    key={t.slug}
                    to={`/trainers/${t.slug}`}
                    className="group p-5 angular-border card-neon transition-all duration-300 hover:[&::before]:bg-primary/50"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="w-12 h-12 p-[1px]"
                        style={{
                          background: "hsl(24 100% 50% / 0.4)",
                          clipPath:
                            "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
                        }}
                      >
                        <img
                          src={t.avatarUrl}
                          alt={t.name}
                          loading="lazy"
                          width="48"
                          height="48"
                          className="w-full h-full object-cover"
                          style={{
                            clipPath:
                              "polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))",
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-barlow-condensed font-bold text-lg uppercase tracking-wide group-hover:text-primary transition-colors">
                          {t.name}
                        </h3>
                        <p className="text-sm text-text-tertiary font-barlow">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary font-barlow line-clamp-2">
                      {t.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TrainerPage;
