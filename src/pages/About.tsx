import Header from "@/components/Header";
import Footer from "@/components/Footer";
import founder1 from "@/assets/founder-1.png";
import founder2 from "@/assets/founder-2.png";

const About = () => {
  const founders = [
    {
      name: "Jake",
      role: "Founder",
      image: founder1,
      bio: "After working with a personal trainer and seeing firsthand how impactful it was, Jake founded Forge to make personalized fitness coaching accessible to everyone through AI.",
    },
    {
      name: "Zachary",
      role: "Co-Founder",
      image: founder2,
      bio: "Fitness enthusiast and health propagandist, Zachary brings his marketing expertise and passion for health and wellness to help build the Forge experience.",
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
                We believe everyone deserves access to quality fitness coaching. Personal training has always been a
                luxury for the few — we're here to change that.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28 bg-forge-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                The <span className="text-gradient">Mission</span>
              </h2>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Our mission is to help people be consistent with their physical fitness by making the process as
                  simple as possible. With AI, everyone can have their own personal trainer for just a tiny fraction of
                  the price charged by traditional trainers, without any constraints like time or location.
                </p>
                <p>
                  Having a trainer is a monumental help for many people, and we are making it accessible to everyone.
                  Our people desperately need to become strong and healthy, and with Forge, it has never been simpler.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                The <span className="text-gradient">Solution</span>
              </h2>

              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Forge was born after Jake, the founder, started working with a personal trainer and saw firsthand just
                  how impactful, and expensive, it was. Realizing that with AI trainers almost everyone could get most
                  of the benefits for less than 5% of the cost, he got to work.
                </p>
                <p>
                  Focusing on progress, accountability, and customizability, Forge is designed to make getting strong as
                  frictionless as possible. Your personal trainer will adapt to your personality, create custom workouts
                  for you based on your preferences, schedule, and progress, and keep you accountable.
                </p>
                <p>
                  With a trainer in their corner, anyone can get in the gym with confidence, and it is our hope that the
                  health of modern society will begin to improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-20 md:py-28 bg-forge-dark">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Meet the <span className="text-gradient">Team</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {founders.map((founder) => (
                <div key={founder.name} className="p-8 rounded-2xl card-gradient border border-border/50 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-primary/30">
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{founder.name}</h3>
                  <p className="text-primary text-sm font-medium mb-4">{founder.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{founder.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 bg-background">
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
                    Everyone deserves a personal trainer, regardless of budget or location.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold mb-2">Simplicity</h3>
                  <p className="text-muted-foreground text-sm">
                    Making the gym as approachable as possible so anyone can start their journey.
                  </p>
                </div>
                <div>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="font-semibold mb-2">Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    Transformation begins in the gym and expands outwards, improving lives.
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
