import type { Competitor } from "./types";

const boostcamp: Competitor = {
  slug: "boostcamp",
  name: "Boostcamp",
  category: "Strength program library",
  group: "tracker",
  hubTagline:
    "Boostcamp gives you 11,000 free programs and a deep logbook. Forge gives you a coach who answers back.",
  heroSubtitle:
    "A free library of famous strength programs, against a coach who adapts your plan and answers questions. What the same $59.99 a year buys from each.",
  verdict: [
    "Boostcamp solved a specific annoyance: turning famous programs into something you can follow on your phone. The library holds more than 11,000 programs, over 130 of them built by coaches like Eric Helms and Alex Bromley, with GZCLP, 5/3/1, nSuns, and the Reddit PPL wired in with progression. Log your sets and the app bumps your next working weights automatically. A plate calculator handles the bar math, and your logs track RPE, RIR, estimated maxes, and PR history. The free tier includes the entire library and the full tracker with no routine cap.",
    "What Boostcamp assumes is that you already know how to lift and will show up on your own. Reviewers score its accountability near the bottom of the scale, and the exercise demos are animated drawings, which help less when you have never touched a barbell. The app covers strength work only, so cardio, running, yoga, and mobility live elsewhere. Forge fills the space that leaves open. Your plan adapts to logged progress and direct feedback, and your trainer answers questions in character at any hour, in whatever voice keeps you training.",
    "The pricing makes the choice unusually clean. Boostcamp Pro costs $14.99 a month with no trial, or $59.99 a year with a 7-day one, which matches Forge's annual price to the cent. The same $59.99 buys two different products: Boostcamp's analytics and exclusive coach programs on one side, Forge's coach on the other. Which one wins depends on whether you want to be left alone with a proven program or guided by a plan that responds to you.",
  ],
  rows: [
    {
      dimension: "Plan adapts to you",
      forge: "Adjusts to your progress and feedback",
      them: "Fixed program with automatic weight bumps",
      winner: "forge",
    },
    {
      dimension: "Program library",
      forge: "Your coach builds the plan for you",
      them: "11,000+ programs, 130+ coach-designed",
      winner: "them",
    },
    {
      dimension: "Auto-progression",
      forge: "Progression adjusts as you improve",
      them: "Weights bump automatically from your logs",
      winner: "tie",
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
      dimension: "Logging depth",
      forge: "Sets, reps, weights, PRs, progress tracking",
      them: "RPE, RIR, supersets, e1RMs, PR history",
      winner: "them",
    },
    {
      dimension: "Free tier",
      forge: "7-day free trial",
      them: "Whole library and full tracker free forever",
      winner: "them",
    },
    {
      dimension: "Learning to lift",
      forge: "Trainer explains the plan and answers form questions",
      them: "Animated demos, assumes you know the lifts",
      winner: "forge",
    },
    {
      dimension: "Apple Watch",
      forge: "None",
      them: "None, iOS has Live Activities instead",
      winner: "tie",
    },
    {
      dimension: "Price, monthly",
      forge: "$19.99",
      them: "$14.99",
      winner: "them",
    },
    {
      dimension: "Price, yearly",
      forge: "$59.99",
      them: "$59.99",
      winner: "tie",
    },
  ],
  theirWins: [
    {
      title: "The free tier is the product",
      body: "The whole program library and the full tracker cost nothing, forever: RPE and RIR logging, a plate calculator, PR history, no routine cap. Forge's free access ends after a 7-day trial.",
    },
    {
      title: "Famous programs, pre-wired",
      body: "GZCLP, 5/3/1, nSuns, the Reddit PPL, plus coach-built plans from names like Eric Helms and Alex Bromley. Progression comes wired in, so you follow the program instead of recreating a spreadsheet.",
    },
    {
      title: "Logging depth for strength training",
      body: "Supersets, drop sets, RPE and RIR, estimated maxes, previous-session results shown inline. If you care about the numbers between the sets, Boostcamp tracks more of them.",
    },
    {
      title: "The monthly price is lower",
      body: "$14.99 against $19.99. Annual billing ties at $59.99, so monthly payers are the ones who save.",
    },
  ],
  forgeWins: [
    {
      title: "A coach you can talk to",
      body: "Forge's four trainers answer questions around the clock, in character. Boostcamp has no coaching layer at all, and reviewers score its interactivity at the bottom of the scale.",
    },
    {
      title: "The plan responds to you",
      body: "Boostcamp runs a fixed script with automatic weight bumps. Forge adjusts the plan itself to your progress and your feedback.",
    },
    {
      title: "Motivation built in",
      body: "Four personalities, from Sergeant Stone's drill instruction to Maya's steady encouragement. Boostcamp assumes you supply your own drive, and reviewers score its accountability near the bottom.",
    },
    {
      title: "A weekly way in",
      body: "Forge offers a $6.99 weekly plan, handy for a short commitment. Boostcamp sells monthly and yearly only, and the monthly plan carries no trial.",
    },
  ],
  theirPricing: [
    { label: "Free tier", value: "$0, full library and tracker" },
    { label: "Monthly (Pro)", value: "$14.99" },
    { label: "Yearly (Pro)", value: "$59.99" },
  ],
  theirPricingNote:
    "From boostcamp.app as of mid-2026. The monthly plan has no trial; the yearly plan includes a 7-day trial. Lifetime pricing is unverified.",
  whoShouldPickThem: [
    "You want a proven barbell or hypertrophy program without paying anything",
    "You motivate yourself and want a deep logbook to back you up",
    "You care about RPE, RIR, and estimated maxes in your logs",
    "You already know the lifts and prefer training without a coach",
  ],
  whoShouldPickForge: [
    "You want a plan that adapts to your progress week to week",
    "You want to ask questions and get answers at any hour",
    "You train better with a personality pushing you",
    "You are newer to lifting and want guidance from day one",
  ],
  faqs: [
    {
      question: "Is Boostcamp free?",
      answer:
        "Yes, and the free tier is the core product: the entire program library and the full tracker, with RPE and RIR logging, a plate calculator, and no routine cap. Pro costs $14.99 a month or $59.99 a year and adds exclusive coach programs plus the deeper analytics.",
    },
    {
      question: "Is Forge or Boostcamp cheaper?",
      answer:
        "Monthly, Boostcamp: $14.99 against $19.99. Yearly, they tie at $59.99, so the question becomes what the same money buys. Boostcamp sells analytics and exclusive programs. Forge sells an adaptive coach with 24/7 chat, and only Forge offers a $6.99 weekly plan.",
    },
    {
      question: "Does Boostcamp coach you?",
      answer:
        "No. You pick a program and Boostcamp runs it, bumping weights from what you log. Reviewers describe it as a digital logbook and score its accountability low. Forge's trainers build the plan around you, adjust it as you progress, and answer questions at any hour.",
    },
    {
      question: "Does Boostcamp work on Apple Watch?",
      answer:
        "No. Boostcamp has no watch app on iOS or Android, though the iPhone version supports Live Activities on the lock screen. Forge has no watch app either, so this row is a draw.",
    },
    {
      question: "Which is better for beginners?",
      answer:
        "Boostcamp assumes you already know how to lift, and its demos are animated drawings. Forge's trainer explains the plan, answers form questions in the chat, and keeps newer lifters consistent. A true beginner gets more from the coach.",
    },
    {
      question: "Can I switch from Boostcamp to Forge?",
      answer:
        "There is no importer, so your Boostcamp history stays put. Start the 7-day trial, log a week of training in Forge, and compare how it feels to have the plan respond to you.",
    },
  ],
  metaTitle: "Forge vs Boostcamp (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs Boostcamp compared honestly: a free library of 11,000 strength programs vs an adaptive AI coach. Same $59.99 a year. See what each one buys.",
  keywords: [
    "forge vs boostcamp",
    "boostcamp alternative",
    "boostcamp review",
    "boostcamp pro worth it",
    "free strength program app",
  ],
};

export default boostcamp;
