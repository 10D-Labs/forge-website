import Header from "@/components/Header";
import Footer from "@/components/Footer";
import founder1 from "@/assets/founder-1.png";
import founder2 from "@/assets/founder-2.png";

const About = () => {
  const founders = [
    {
      name: "Alex Mitchell",
      role: "Co-Founder & CEO",
      image: founder1,
      bio: "Former personal trainer with 8+ years of experience. After seeing too many clients struggle to afford consistent training, Alex became obsessed with making expert fitness guidance accessible to everyone.",
    },
    {
      name: "Jordan Chen",
      role: "Co-Founder & CTO",
      image: founder2,
      bio: "AI researcher and fitness enthusiast. Jordan combines his passion for machine learning with his love for fitness to build technology that truly understands and adapts to each user's unique journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-hero-gradient relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-glow opacity-30" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="text-gradient">Mission</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                We believe everyone deserves access to quality fitness coaching. Personal training has always been a luxury for the few — we're here to change that.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28 bg-forge-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Why We Built <span className="text-gradient">Forge</span>
              </h2>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The idea for Forge came from a simple observation: personal training works. People who work with trainers consistently see better results, stay more motivated, and learn proper form. But at $50-150 per session, it's out of reach for most people.
                </p>
                <p>
                  We met at a gym in San Francisco. Alex was training clients between tech jobs, frustrated that he could only help so many people. Jordan was building AI systems for tech companies, frustrated that the technology wasn't being used to help everyday people.
                </p>
                <p>
                  We started asking: what if we could combine years of personal training expertise with cutting-edge AI? What if we could create a trainer that learns your preferences, adapts to your schedule, and is always there when you need guidance?
                </p>
                <p>
                  After two years of development, thousands of beta users, and countless iterations, Forge is that vision realized. It's not about replacing human connection — it's about making expert fitness guidance accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Meet the <span className="text-gradient">Team</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((founder) => (
                <div
                  key={founder.name}
                  className="p-8 rounded-2xl card-gradient border border-border/50 text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{founder.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-forge-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                What We <span className="text-gradient">Stand For</span>
              </h2>

              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <h3 className="font-semibold mb-2">Accessibility</h3>
                  <p className="text-muted-foreground text-sm">
                    Quality fitness coaching should be available to everyone, not just the wealthy.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h3 className="font-semibold mb-2">Intelligence</h3>
                  <p className="text-muted-foreground text-sm">
                    Every recommendation is backed by sports science and adapts to your progress.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="text-muted-foreground text-sm">
                    Your AI trainer is always there — no scheduling, no excuses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
