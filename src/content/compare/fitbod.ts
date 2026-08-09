import type { Competitor } from "./types";

const fitbod: Competitor = {
  slug: "fitbod",
  name: "Fitbod",
  category: "AI workout generator",
  group: "ai",
  hubTagline:
    "Fitbod generates each workout from your recovery state. Forge puts a trainer behind the plan.",
  heroSubtitle:
    "Two apps that both claim the word adaptive. Here is what each one does with your training, priced out and called honestly.",
  verdict: [
    "Fitbod has spent a decade tuning one trick. Open the app and a workout appears, built from your logged history, your equipment, and a heatmap of which muscles have recovered. That trick works well. Lifters who travel or train in crowded gyms swear by the equipment switching, and the interface earns its polish.",
    "The workout is where the product stops. The algorithm picks exercises without explaining the choice, and r/fitbod threads regularly show sessions nobody would have written for themselves. You can log the work and watch the heatmap, but asking why today's plan looks the way it does gets you silence. Forge puts a trainer inside the plan. Ask Reese why your squat volume dropped this week and you get an answer, in character, at 11pm if that is when you train.",
    "Over a year Forge also costs less. Fitbod runs $95.99 annually against Forge's $59.99, though Fitbod's monthly plan undercuts Forge's by four dollars. Fitbod holds real advantages too: an Apple Watch app, a far bigger exercise demo library, and a small free sample before you pay. If logging from your wrist matters more than having a coach, Fitbod is the better buy and we mean that.",
  ],
  rows: [
    {
      dimension: "How the plan gets built",
      forge: "A coach-built plan that adapts to your progress and feedback",
      them: "An algorithm generates each session from recovery and equipment",
      winner: "tie",
    },
    {
      dimension: "Asking why",
      forge: "24/7 chat with your trainer, in character",
      them: "No explanation layer",
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
      them: "1,000+ exercises with video demos and muscle maps",
      winner: "them",
    },
    {
      dimension: "Muscle recovery view",
      forge: "Progress tracking by muscle group",
      them: "Recovery heatmap that picks fresh muscles",
      winner: "them",
    },
    {
      dimension: "Workout logging",
      forge: "Sets, reps, weights, PRs, progress tracking",
      them: "Sets, reps, weights, PRs",
      winner: "tie",
    },
    {
      dimension: "Apple Watch",
      forge: "iPhone and Android",
      them: "Working Apple Watch app",
      winner: "them",
    },
    {
      dimension: "Android experience",
      forge: "Same app as iOS",
      them: "Users report a buggier Android build",
      winner: "forge",
    },
    {
      dimension: "Trying before paying",
      forge: "7-day free trial",
      them: "About 3 free workouts, then paywalled",
      winner: "tie",
    },
    {
      dimension: "Price, monthly",
      forge: "$19.99",
      them: "$15.99",
      winner: "them",
    },
    {
      dimension: "Price, yearly",
      forge: "$59.99",
      them: "$95.99",
      winner: "forge",
    },
  ],
  theirWins: [
    {
      title: "It works from your wrist",
      body: "Fitbod ships a real Apple Watch app and Forge does not. If you train with your phone in a locker, that settles the choice on its own.",
    },
    {
      title: "The exercise library is deeper",
      body: "Over a thousand movements with video demos and muscle-map animations, built up across a decade. Forge's library covers the lifts its programs use. Fitbod's covers nearly everything.",
    },
    {
      title: "The monthly price is lower",
      body: "$15.99 against $19.99, plus a handful of free workouts before the paywall. Yearly flips the other way, so the winner depends on how you pay.",
    },
    {
      title: "The recovery heatmap earns its praise",
      body: "A color map of which muscles have recovered, updated from your logs. It is the feature Fitbod users mention most, and it drives the session generation.",
    },
  ],
  forgeWins: [
    {
      title: "A trainer you can talk to",
      body: "Forge's four trainers answer questions around the clock. Why this exercise, why this weight, what to swap when the rack is taken. Fitbod generates. Forge explains.",
    },
    {
      title: "The plan has a voice",
      body: "Sergeant Stone pushes, Maya encourages, Mike keeps it loose, Reese talks data. Motivation is the feature most workout apps skip, and it is the one that keeps people training past week three.",
    },
    {
      title: "A year costs $36 less",
      body: "$59.99 against $95.99. Forge also offers a $6.99 weekly plan, which Fitbod does not, so a short commitment costs less too.",
    },
    {
      title: "Android gets the same app",
      body: "Fitbod's Android users report overwritten custom workouts and rough edges the iOS version avoids. Forge ships one experience on both platforms.",
    },
  ],
  theirPricing: [
    { label: "Monthly", value: "$15.99" },
    { label: "Yearly", value: "$95.99" },
    { label: "Free sample", value: "~3 workouts" },
  ],
  theirPricingNote:
    "Prices from Fitbod's help center as of early 2026. Fitbod price-tests, so the App Store may show a slightly different figure.",
  whoShouldPickThem: [
    "You train with an Apple Watch and leave your phone in a locker",
    "You want the largest possible exercise demo library",
    "You pay monthly and want the cheaper monthly bill",
    "You like being handed a session and never asking why",
  ],
  whoShouldPickForge: [
    "You want a coach who explains the plan and answers questions any hour",
    "You train better with a personality pushing you",
    "You pay yearly and want the lower annual price",
    "You have been burned by generator workouts that made no sense",
  ],
  faqs: [
    {
      question: "Is Forge or Fitbod cheaper?",
      answer:
        "Depends on how you pay. Fitbod's monthly plan is $15.99 against Forge's $19.99. Forge's yearly plan is $59.99 against Fitbod's $95.99, and Forge adds a $6.99 weekly option. Over twelve months on annual billing, Forge costs $36 less.",
    },
    {
      question: "Does Fitbod use AI?",
      answer:
        "Yes, in the generator sense. It builds each session from your logged history, recovery state, and equipment. What it lacks is a conversational layer. There is no trainer to ask why an exercise was chosen or what to swap when equipment is taken. Forge's AI works as a coach you talk to, with four distinct personalities.",
    },
    {
      question: "Does Forge work on Apple Watch?",
      answer:
        "No. Forge runs on iPhone and Android, and Fitbod has the working watch app. If wrist logging is a hard requirement, Fitbod wins that point today.",
    },
    {
      question: "Can Fitbod replace a personal trainer?",
      answer:
        "It replaces the programming question, what to do today, better than most apps. The coaching questions are where it thins out: why the plan looks this way, how to adjust around a sore shoulder, what to do when progress stalls. Forge was built around exactly those questions.",
    },
    {
      question: "Which is better for beginners?",
      answer:
        "Fitbod's video library helps a beginner learn movements. Forge's trainer chat helps a beginner learn training: what to do, why, and what comes next, with a personality that keeps them showing up. Most beginners quit from confusion or boredom, and Forge attacks both.",
    },
    {
      question: "Can I switch from Fitbod to Forge?",
      answer:
        "There is no importer, so your Fitbod history stays in Fitbod. Set up your plan in Forge, log your next week of training there, and let it learn your numbers from fresh data. A week of double-logging tells you more than a month of reading reviews.",
    },
  ],
  metaTitle: "Forge vs Fitbod (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs Fitbod compared honestly: workout generation vs real coaching, exercise libraries, Apple Watch, and price. $59.99 vs $95.99 a year. See who wins each row.",
  keywords: [
    "forge vs fitbod",
    "fitbod alternative",
    "fitbod review",
    "best ai workout app",
    "fitbod vs ai trainer",
  ],
};

export default fitbod;
