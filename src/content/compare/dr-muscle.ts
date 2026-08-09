import type { Competitor } from "./types";

const drMuscle: Competitor = {
  slug: "dr-muscle",
  name: "Dr. Muscle",
  category: "AI strength coach",
  group: "ai",
  hubTagline:
    "Dr. Muscle applies the deepest research protocols in the category, at the steepest price.",
  heroSubtitle:
    "A PhD-built programming engine against a trainer you can talk to. Priced out and called honestly, row by row.",
  verdict: [
    "Dr. Muscle was founded by Dr. Carl Juneau, a PhD who built the app around published hypertrophy research, and the programming shows it. Sessions run on daily undulating periodization with rest-pause sets and reps-in-reserve targets, and the app recalculates your next set after every set you log. Warm-up sets generate automatically and deloads trigger without you tracking fatigue. Few consumer apps apply periodization science this faithfully.",
    "The experience around that engine feels thinner. Exercise demos are basic clips, and weight suggestions sometimes land too conservative to drive progress. Chat with the AI coach sits behind the premium paywall, so the free tier after trial keeps one exercise recommendation a day and little else. Forge builds the coaching layer first. Your plan comes with one of four trainer personalities who answers questions in character at any hour.",
    "Then there is the bill. Dr. Muscle costs $48.99 a month or $399.99 a year, the most expensive subscription in this category, with nutrition as an $18.99 monthly add-on. Forge is $19.99 a month or $59.99 a year. The 14-day trial with no card required is generous and worth using, because a plateaued intermediate lifter might find the programming worth the premium. At nearly seven times Forge's yearly price, most lifters will not.",
  ],
  rows: [
    {
      dimension: "Programming methodology",
      forge: "Adaptive plans built around your progress and feedback",
      them: "Daily undulating periodization, rest-pause, RIR, automated deloads",
      winner: "them",
    },
    {
      dimension: "Mid-workout adaptation",
      forge: "The plan adapts as you progress",
      them: "Recalculates sets, reps, and weights after every logged set",
      winner: "them",
    },
    {
      dimension: "Warm-up guidance",
      forge: "Built into your coach's plan",
      them: "Automated warm-up generation for each lift",
      winner: "them",
    },
    {
      dimension: "Coaching personality",
      forge: "Four trainers with distinct voices, from drill instructor to supportive",
      them: "Clinical tone, no personalities",
      winner: "forge",
    },
    {
      dimension: "Asking questions",
      forge: "24/7 chat with your trainer, included in every plan",
      them: "AI chat gated behind the premium tier",
      winner: "forge",
    },
    {
      dimension: "Workout logging",
      forge: "Sets, reps, weights, PRs, progress tracking",
      them: "Sets, reps, weights with RPE tracking",
      winner: "tie",
    },
    {
      dimension: "Free trial",
      forge: "7 days",
      them: "14 days, no credit card required",
      winner: "them",
    },
    {
      dimension: "Free plan after trial",
      forge: "None",
      them: "Limited plan, one AI exercise recommendation a day",
      winner: "them",
    },
    {
      dimension: "Price, monthly",
      forge: "$19.99",
      them: "$48.99",
      winner: "forge",
    },
    {
      dimension: "Price, yearly",
      forge: "$59.99",
      them: "$399.99",
      winner: "forge",
    },
  ],
  theirWins: [
    {
      title: "Research-grade programming",
      body: "Daily undulating periodization, rest-pause sets, and reps-in-reserve targets, applied the way the studies describe. Dr. Carl Juneau built the app from his PhD work, and it shows.",
    },
    {
      title: "Adaptation mid-workout",
      body: "Log a set and the app recalculates the next one on the spot. Few apps adjust within the session at all, and Dr. Muscle does it set by set.",
    },
    {
      title: "A trial that asks for nothing",
      body: "Fourteen days with no credit card required. After the trial a limited free plan keeps one AI exercise recommendation a day, so you can keep a toe in without paying.",
    },
    {
      title: "No ads, no data selling",
      body: "The company charges a premium and funds itself with it. Updates ship weekly, and your training data stays out of ad networks.",
    },
  ],
  forgeWins: [
    {
      title: "One seventh of the annual cost",
      body: "Dr. Muscle charges $399.99 a year. Forge charges $59.99. That gap covers a lot of gym membership.",
    },
    {
      title: "Coaching with a pulse",
      body: "Four trainer personalities, from a drill instructor to a data-driven analyst, answering in character whenever you train. Dr. Muscle takes a clinical tone, and its coach chat requires the premium tier.",
    },
    {
      title: "Chat included on every plan",
      body: "Every Forge subscription includes the 24/7 trainer chat. Dr. Muscle locks its AI chat behind the premium tier, and the free plan loses deloads and reports along with it.",
    },
    {
      title: "A lower monthly bill too",
      body: "$19.99 against $48.99. If you prefer paying as you go, Forge costs less than half.",
    },
  ],
  theirPricing: [
    { label: "Monthly", value: "$48.99" },
    { label: "Yearly", value: "$399.99" },
    { label: "Free plan", value: "Limited, post-trial" },
  ],
  theirPricingNote:
    "Prices from the live App Store listing as of early 2026. Older reviews cite lower figures because the app has raised prices three times, so trust the App Store over third-party articles. A meal-plan add-on runs $18.99 a month.",
  whoShouldPickThem: [
    "You have plateaued on a static plan and want proven periodization protocols",
    "You have six months or more of training behind you and care about the science",
    "You want set-by-set recalculation while you are mid-workout",
    "You are willing to pay $400 a year for the deepest programming in the category",
  ],
  whoShouldPickForge: [
    "You want a trainer who talks to you, with a personality you pick",
    "You want adaptive training at $59.99 a year, nearly seven times cheaper",
    "You are earlier in your lifting and want guidance alongside the numbers",
    "You want chat on every plan, including the trial week",
  ],
  faqs: [
    {
      question: "Why is Dr. Muscle so expensive?",
      answer:
        "At $48.99 a month or $399.99 a year it is the priciest consumer workout app we track, two to three times Fitbod's price. The company has raised prices three times and positions itself as a coach replacement. Whether that math works depends on what programming is worth to you, and Forge delivers adaptive training at $59.99 a year.",
    },
    {
      question: "Is there a free version of Dr. Muscle?",
      answer:
        "Sort of. The 14-day trial needs no credit card, and after it ends a limited free plan keeps one AI exercise recommendation per day. Deloads, chat, and reports disappear on the free tier, so treat it as a demo. Forge has no permanent free plan, though its 7-day trial covers every feature.",
    },
    {
      question: "Does Dr. Muscle work on Apple Watch?",
      answer:
        "The app lists Apple Watch support, which we could not independently verify, so test it during the trial if wrist logging matters to you. Forge has no watch app on any platform.",
    },
    {
      question: "Which is better for breaking a plateau, Dr. Muscle or Forge?",
      answer:
        "Dr. Muscle was built for that exact user, an intermediate lifter whose static plan stopped working, and it answers with daily undulating periodization and automated deloads. Forge answers the same problem with adaptive plans plus a coach who can talk through the stall with you, at a fraction of the price.",
    },
    {
      question: "Does Dr. Muscle include meal plans?",
      answer:
        "Only as an $18.99 monthly add-on on top of the subscription. Forge skips nutrition entirely and stays workout-only, so if diet tracking matters you will pair either app with something else.",
    },
    {
      question: "Can I switch from Dr. Muscle to Forge?",
      answer:
        "Nothing imports automatically, so your logged history stays behind. Start Forge's trial, train a normal week, and let the plan calibrate from your fresh numbers before you cancel anything.",
    },
  ],
  metaTitle: "Forge vs Dr. Muscle (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs Dr. Muscle compared honestly: research-grade periodization vs coaching personality, and $59.99 vs $399.99 a year. See who wins each row.",
  keywords: [
    "forge vs dr muscle",
    "dr muscle alternative",
    "dr muscle app review",
    "dr muscle pricing",
    "best ai personal trainer app",
  ],
};

export default drMuscle;
