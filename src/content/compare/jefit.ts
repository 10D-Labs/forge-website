import type { Competitor } from "./types";

const jefit: Competitor = {
  slug: "jefit",
  name: "JEFIT",
  category: "Workout logbook",
  group: "tracker",
  hubTagline:
    "JEFIT logs everything against a 1,400-exercise database. Forge coaches the training it tracks.",
  heroSubtitle:
    "A veteran logbook with the deepest exercise database around, against a coach that adapts your plan and answers back. Priced out and called honestly.",
  verdict: [
    "JEFIT has been logging workouts since around 2010, and the years show in the depth. The exercise database runs past 1,400 movements with animated demos. Community members have shared around 98,000 routines on top of 3,000 trainer-built ones, and the logbook tracks body measurements alongside your lifts. Twelve million people have signed up, and the App Store rating sits at 4.8. The free tier alone covers more than some paid apps.",
    "Everything JEFIT does happens after you decide what to do. The app records your training while the programming stays yours, borrowed from a community routine whose quality you judge yourself. The interface feels its age. Free-tier users sit through banner and interstitial ads mid-session, and logging between sets runs slower than in the newer minimalist trackers. Forge works from the other direction: your plan adapts as you log progress and give feedback, and a trainer you can message at any hour explains the choices behind it.",
    "JEFIT Elite costs $12.99 a month or $69.99 a year, with an ad-supported tier underneath that many lifters never leave. Forge runs $19.99 monthly and $59.99 yearly. JEFIT's monthly plan is cheaper by seven dollars, and Forge's yearly plan is cheaper by ten. JEFIT earns its price when the logbook itself is what you value, especially with watch apps on both platforms and a full web version. Forge makes sense when the missing piece is a coach around those logs.",
  ],
  rows: [
    {
      dimension: "How the plan gets built",
      forge: "A coach-built plan that adapts to your progress and feedback",
      them: "You write your own or borrow a community routine",
      winner: "forge",
    },
    {
      dimension: "Asking why",
      forge: "24/7 chat with your trainer, in character",
      them: "No coaching layer",
      winner: "forge",
    },
    {
      dimension: "Coaching personality",
      forge: "Four trainers with distinct voices, from drill instructor to supportive",
      them: "None",
      winner: "forge",
    },
    {
      dimension: "Exercise library",
      forge: "Full library with guidance",
      them: "1,400+ exercises with animated demos",
      winner: "them",
    },
    {
      dimension: "Workout logging",
      forge: "Sets, reps, weights, PRs, progress tracking",
      them: "Sets, reps, weights, PRs, body measurements",
      winner: "tie",
    },
    {
      dimension: "Free tier",
      forge: "7-day free trial",
      them: "Usable free tier with ads",
      winner: "them",
    },
    {
      dimension: "Ads",
      forge: "No ads at any tier",
      them: "Banner and interstitial ads on the free plan",
      winner: "forge",
    },
    {
      dimension: "Watch apps",
      forge: "iPhone and Android phones",
      them: "Apple Watch app plus a standalone Wear OS module",
      winner: "them",
    },
    {
      dimension: "Web access",
      forge: "None",
      them: "Full web app",
      winner: "them",
    },
    {
      dimension: "Body measurements",
      forge: "Workout progress tracking",
      them: "Body measurement tracking alongside lifts",
      winner: "them",
    },
    {
      dimension: "Price, monthly",
      forge: "$19.99",
      them: "$12.99",
      winner: "them",
    },
    {
      dimension: "Price, yearly",
      forge: "$59.99",
      them: "$69.99",
      winner: "forge",
    },
  ],
  theirWins: [
    {
      title: "The exercise database is the deepest around",
      body: "More than 1,400 movements with HD and animated demos, built over fifteen years. Forge's library covers the lifts its plans use. JEFIT's covers nearly every variation a lifter could name.",
    },
    {
      title: "The free tier is a real product",
      body: "Ads support it, including interstitials mid-session, yet logging and the full exercise library work without paying. Reddit threads recommend it to beginners for exactly this reason.",
    },
    {
      title: "It works on your wrist and in your browser",
      body: "There is an Apple Watch app and a standalone Wear OS module, plus a full web app for logging at a desk. Forge runs on phones only.",
    },
    {
      title: "Fifteen years of shared routines",
      body: "Around 98,000 community routines plus 3,000 trainer-built plans, rated and remixed by 12 million users. When you want someone else's program, the pickings are enormous.",
    },
  ],
  forgeWins: [
    {
      title: "A coach behind the plan",
      body: "JEFIT stores what you did, full stop. Forge's plans adapt to your progress and your feedback, so the next session changes as you do.",
    },
    {
      title: "Someone to ask at 11pm",
      body: "Four trainer personalities answer questions around the clock, in character. Why this exercise. What to swap when the rack is taken. JEFIT has no one on the other end.",
    },
    {
      title: "No ads at any tier",
      body: "JEFIT's free users get banner and interstitial ads between sets, the most common complaint in its reviews. Forge has no ad-supported tier, so nothing interrupts a workout.",
    },
    {
      title: "Ten dollars less per year",
      body: "$59.99 against $69.99 on annual billing. JEFIT's monthly plan is cheaper than Forge's, so how you pay decides this one.",
    },
  ],
  theirPricing: [
    { label: "Monthly (Elite)", value: "$12.99" },
    { label: "Yearly (Elite)", value: "$69.99" },
    { label: "Free tier", value: "Ad-supported" },
  ],
  theirPricingNote:
    "From jefit.com/elite as of mid-2026. In-app store prices may differ from web prices. Trial and lifetime options are unconfirmed.",
  whoShouldPickThem: [
    "You want the biggest exercise library a logbook can offer",
    "You train with an Apple Watch or Wear OS watch on your wrist",
    "You refuse to pay and can live with ads",
    "You like browsing community routines and building your own plan",
  ],
  whoShouldPickForge: [
    "You want a plan that adapts to your progress without spreadsheets",
    "You train better with a personality in your corner",
    "You want to ask questions mid-workout and get answers",
    "You pay yearly and want the lower annual price with no ads",
  ],
  faqs: [
    {
      question: "Is Forge or JEFIT cheaper?",
      answer:
        "Depends on how you pay. JEFIT Elite costs $12.99 a month against Forge's $19.99, while Forge's yearly plan costs $59.99 against JEFIT's $69.99. JEFIT also has a free ad-supported tier, which Forge matches only with a 7-day trial.",
    },
    {
      question: "Does JEFIT have AI coaching?",
      answer:
        "No. JEFIT is a tracker: it stores your workouts and your routines, and the planning stays with you. There is no plan generation and no one to ask why a session looks the way it does. Forge's AI works as a coach you talk to, with four personalities and a plan that adapts to your logs.",
    },
    {
      question: "Does JEFIT work on Apple Watch?",
      answer:
        "Yes, and it also ships a standalone Wear OS module for Android watches. Forge runs on iPhone and Android phones only. If wrist logging is a hard requirement, JEFIT wins that point today.",
    },
    {
      question: "Is JEFIT's free tier good enough?",
      answer:
        "For many lifters, yes. The exercise database and full logging work without paying, funded by banner and interstitial ads that interrupt sessions. Forge has no ad-supported tier, so nothing interrupts a workout there.",
    },
    {
      question: "Which is better for beginners?",
      answer:
        "JEFIT's animated demos help a beginner learn movements, and the free tier costs nothing while they find their routine. Forge's trainer explains training itself, what to do and why, with a personality that keeps them showing up. Beginners who stall from confusion do better with the coach.",
    },
    {
      question: "Can I switch from JEFIT to Forge?",
      answer:
        "There is no importer, so your JEFIT history stays in JEFIT. Set up your plan in Forge, log the next week of training there, and let it learn your numbers from fresh data.",
    },
  ],
  metaTitle: "Forge vs JEFIT (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs JEFIT compared honestly: an adaptive AI coach vs a 1,400-exercise logbook, free tier, watch apps, and price. $59.99 vs $69.99 a year.",
  keywords: [
    "forge vs jefit",
    "jefit alternative",
    "jefit review",
    "jefit elite worth it",
    "best workout tracker app",
  ],
};

export default jefit;
