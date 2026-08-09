import type { Competitor } from "./types";

const hevy: Competitor = {
  slug: "hevy",
  name: "Hevy",
  category: "Social workout tracker",
  group: "tracker",
  hubTagline:
    "Hevy is the gym logbook everyone recommends. Forge is the coach that fills it in for you.",
  heroSubtitle:
    "A tracker and a coach solve different problems. Here is where Hevy's logbook beats Forge, and where having a trainer beats having a notebook.",
  verdict: [
    "Hevy is the gym logbook Reddit recommends most, and the free tier explains why. Unlimited logging with rest timers and no ads, before you pay a cent. Recording a set takes seconds between exercises, friends follow your sessions and cheer your PRs, and the watch apps track offline. Over 545,000 ratings sit at 4.9 stars. As a place to write down what you lifted, it is close to finished.",
    "Writing down is all it does. Hevy records what you did and stays silent about what you should do next, which is the question that stalls most lifters. The RPE field feeds no progression logic, and the Hevy Trainer plan generator announced for 2026 remains shallow. Forge exists on the other side of that line: it decides your next session and adjusts it when your numbers stall, with a trainer you can ask about the reasoning at any hour.",
    "Price is the honest sticking point. Hevy Pro costs $23.99 a year, and the $74.99 lifetime option runs less than four months of Forge. If you know your programming and want a fast notebook, paying Forge $59.99 a year makes no sense, and we will say so plainly. Forge earns its price for the lifter who opens the app wondering what to do today, the question Hevy structurally cannot answer.",
  ],
  rows: [
    {
      dimension: "What the app does",
      forge: "Builds your plan, adapts it as you progress, and logs every set",
      them: "Records what you did, fast",
      winner: "forge",
    },
    {
      dimension: "Coaching and progression",
      forge: "Adaptive plan with a trainer explaining the choices",
      them: "None; the 2026 Trainer generator stays basic",
      winner: "forge",
    },
    {
      dimension: "Asking questions",
      forge: "24/7 chat with your trainer",
      them: "Nobody to ask",
      winner: "forge",
    },
    {
      dimension: "Logging speed",
      forge: "Fast logging of sets, reps, weights, PRs",
      them: "Seconds between sets, with supersets and drop sets",
      winner: "tie",
    },
    {
      dimension: "Free tier",
      forge: "7-day trial, then paid",
      them: "Unlimited logging with no ads, capped routines and history",
      winner: "them",
    },
    {
      dimension: "Social accountability",
      forge: "Trainer check-ins",
      them: "Friends follow your workouts and celebrate PRs",
      winner: "them",
    },
    {
      dimension: "Apple Watch and Wear OS",
      forge: "No watch app",
      them: "Both watch platforms, with offline tracking",
      winner: "them",
    },
    {
      dimension: "Web and desktop",
      forge: "No web app",
      them: "Full web app",
      winner: "them",
    },
    {
      dimension: "Price",
      forge: "$59.99 a year",
      them: "$23.99 a year or $74.99 lifetime",
      winner: "them",
    },
    {
      dimension: "Plans for beginners",
      forge: "A plan from day one, with a trainer to ask",
      them: "Bring your own routine",
      winner: "forge",
    },
    {
      dimension: "Progress tracking",
      forge: "PRs and progress by muscle group",
      them: "PRs, charts, and history depth",
      winner: "tie",
    },
  ],
  theirWins: [
    {
      title: "The free tier is honest",
      body: "Unlimited logging with rest timers and no ads, without paying. The caps sit on routine count and history length, so a casual lifter may never need Pro.",
    },
    {
      title: "The price is hard to argue with",
      body: "Pro costs $23.99 a year, and the $74.99 lifetime option gets rarer every year in this category. Four months of Forge's monthly plan costs more than Hevy forever.",
    },
    {
      title: "It lives everywhere",
      body: "iPhone and Android, a full web app, plus Apple Watch and Wear OS apps with offline tracking. Forge covers the first two and stops there.",
    },
    {
      title: "The social feed keeps people honest",
      body: "Friends follow your sessions and PRs get celebrated, so the feed doubles as an accountability group. Fifteen million users make it the largest lifting community on any tracker.",
    },
  ],
  forgeWins: [
    {
      title: "Forge decides, Hevy records",
      body: "Hevy writes down what you did. Forge tells you what to do next and adapts the plan when your progress or your week changes. For anyone unsure of their programming, that gap is the whole product.",
    },
    {
      title: "A trainer on call",
      body: "Questions at midnight, a swap when the rack is busy, a nudge when you skip. Forge's four trainers handle all of it in character. Hevy has nobody to ask.",
    },
    {
      title: "Progression with logic behind it",
      body: "Hevy's RPE field drives nothing and its new Trainer generator stays shallow. Forge reads your logged numbers and moves the plan forward with the reasoning attached.",
    },
    {
      title: "Motivation is built in",
      body: "Hevy leans on friends for accountability, and the feed can become scrolling instead. Forge's trainers push you personally, in whatever style you respond to, from Sergeant Stone's drill voice to Maya's encouragement.",
    },
  ],
  theirPricing: [
    { label: "Pro Monthly", value: "$2.99" },
    { label: "Pro Yearly", value: "$23.99" },
    { label: "Lifetime", value: "$74.99" },
  ],
  theirPricingNote:
    "Verified from hevyapp.com and the App Store in early 2026. A free trial for Pro is unconfirmed, since the free tier covers that role informally.",
  whoShouldPickThem: [
    "You already know your programming and want a fast logbook",
    "You want a free tracker with no ads",
    "You train with an Apple Watch or a Wear OS watch",
    "You want the cheapest pro tier around, or a lifetime buy",
  ],
  whoShouldPickForge: [
    "You want the app to decide what you do next",
    "You stall often and want a plan that adjusts to you",
    "You want a trainer to ask questions, at any hour",
    "You need a personality pushing you more than a feed of friends",
  ],
  faqs: [
    {
      question: "Is Hevy free?",
      answer:
        "The free tier is the real thing. You get unlimited logging with rest timers and no ads, capped at about four routines and three months of history. Pro lifts those caps for $2.99 a month or $23.99 a year, with a $74.99 lifetime option.",
    },
    {
      question: "Is Forge or Hevy cheaper?",
      answer:
        "Hevy, and it is not close. Hevy Pro costs $23.99 a year against Forge's $59.99, and the $74.99 lifetime plan costs less than four months of Forge's monthly billing. Forge only wins on price if coaching is worth paying for, which is the whole question.",
    },
    {
      question: "Does Hevy tell you what workout to do?",
      answer:
        "No. Hevy logs what you did and shows your history, but the programming decision stays with you. A Hevy Trainer plan generator was announced for 2026 and early versions stay basic. Forge's core product is that decision, an adaptive plan plus a trainer who explains it.",
    },
    {
      question: "Can I use Hevy on my watch or computer?",
      answer:
        "Yes, and this is Hevy's clearest edge over Forge. There are Apple Watch and Wear OS apps with offline tracking, plus a full web app for desktop. Forge runs on iPhone and Android only.",
    },
    {
      question: "Should I pay for Forge if I already use Hevy?",
      answer:
        "Ask what you want from the app. If your programming is settled and you need a logbook, Hevy does that job for less money, sometimes for free. If you open the app unsure what to train today, that is the problem Forge's trainers exist to solve.",
    },
    {
      question: "Does Hevy have a coach or AI trainer?",
      answer:
        "No coaching layer exists today. Hevy announced a simple plan generator called Hevy Trainer for 2026, which produces static sessions without a chat or adaptation to your feedback. Forge's four trainers answer questions around the clock and reshape your plan week to week.",
    },
  ],
  metaTitle: "Forge vs Hevy (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs Hevy compared honestly: a free-first workout tracker vs an AI coach that builds your plan. Logging speed, platforms, price, and who should pick which.",
  keywords: [
    "forge vs hevy",
    "hevy alternative",
    "hevy review",
    "best workout tracker app",
    "hevy vs ai trainer",
  ],
};

export default hevy;
