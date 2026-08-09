import type { Competitor } from "./types";

const freeletics: Competitor = {
  slug: "freeletics",
  name: "Freeletics",
  category: "AI bodyweight coach",
  group: "ai",
  hubTagline:
    "Freeletics is the polished bodyweight veteran. Forge is the trainer who lifts with you.",
  heroSubtitle:
    "Twelve years of HIIT refinement against a coach you can message at midnight. Two different ideas of what an AI trainer should be, priced out and called honestly.",
  verdict: [
    "Freeletics has been at this since 2013, and the polish shows. The bodyweight progressions rank among the best in any app, HIIT sessions come with audio coaching that talks you through the work, and the plan adapts each week from your difficulty ratings, your equipment, and the time you have. Running workouts sit beside the strength plan, and the community behind it all has produced over 400,000 five-star reviews and a Google Play Editor's Choice badge.",
    "The coaching is a rating form. After each workout you tap how hard it felt and the algorithm adjusts. There is nobody to ask why the week looks the way it does, and lifters with a barbell will find the gym programming thin next to the bodyweight work. The intensity assumes a base of fitness, and true beginners often drown in the opening weeks. Trustpilot hovers near 3.3 with complaints about billing, refunds, and support that goes quiet. Forge takes the other side of that trade. Strength training logged in sets, reps, weights, and PRs, plus a trainer in a personality you picked who answers questions at any hour.",
    "Freeletics does not publish its prices openly. Reported figures run around $34.99 a month or $99.99 a year depending on region and term, with a lifetime option reportedly near $469.99. Against Forge's published $19.99 monthly and $59.99 yearly, Freeletics likely costs more and tells you less about it up front. If you want structured bodyweight training with audio coaching and a running plan, Freeletics justifies its price. If you lift weights and want a coach in your pocket, Forge does more for less.",
  ],
  rows: [
    {
      dimension: "Bodyweight and HIIT programming",
      forge: "Solid bodyweight work inside a broader plan",
      them: "Best-in-class progressions refined since 2013",
      winner: "them",
    },
    {
      dimension: "Gym strength training",
      forge: "Barbell and dumbbell plans with logged progression",
      them: "Thin gym programming next to the bodyweight work",
      winner: "forge",
    },
    {
      dimension: "How the plan adapts",
      forge: "Adapts to your progress and written feedback",
      them: "Adapts from post-workout difficulty ratings",
      winner: "tie",
    },
    {
      dimension: "Asking why",
      forge: "24/7 chat with your trainer, in character",
      them: "No conversational layer",
      winner: "forge",
    },
    {
      dimension: "Audio coaching",
      forge: "Coaching happens in chat between sets",
      them: "A voice paces you through HIIT sessions",
      winner: "them",
    },
    {
      dimension: "Running workouts",
      forge: "Strength training focus",
      them: "Adaptive run programming included",
      winner: "them",
    },
    {
      dimension: "Workout logging",
      forge: "Sets, reps, weights, PRs, progress tracking",
      them: "Completion and difficulty ratings",
      winner: "forge",
    },
    {
      dimension: "Apple Watch",
      forge: "iPhone and Android",
      them: "Apple Watch companion app",
      winner: "them",
    },
    {
      dimension: "Community",
      forge: "Growing",
      them: "Huge, with 400k+ five-star reviews",
      winner: "them",
    },
    {
      dimension: "Nutrition",
      forge: "Not offered, workout-only by design",
      them: "Separate paid Nutrition Coach add-on",
      winner: "them",
    },
    {
      dimension: "Trying before paying",
      forge: "7-day free trial",
      them: "Limited free tier, refund window over a trial",
      winner: "tie",
    },
    {
      dimension: "Price, yearly",
      forge: "$59.99, published",
      them: "Reported ~$99.99, not openly published",
      winner: "forge",
    },
  ],
  theirWins: [
    {
      title: "Twelve years of polish",
      body: "Freeletics has refined bodyweight and HIIT programming since 2013. The guided sessions, the demos, the pacing of a workout from warm-up to cooldown all show every year of it.",
    },
    {
      title: "Audio coaching",
      body: "A voice talks you through HIIT sessions in real time, pacing the work and the rest. Forge's coaching happens in chat between sets. Freeletics speaks during the work itself.",
    },
    {
      title: "Running is included",
      body: "Run workouts sit beside the strength plan under the same adaptive logic. Forge programs gym training, and Freeletics covers the road too.",
    },
    {
      title: "A massive review base",
      body: "Over 400,000 five-star reviews and a Google Play Editor's Choice badge. Whatever its support problems, the product has kept a huge community training for years.",
    },
  ],
  forgeWins: [
    {
      title: "Real strength training",
      body: "Forge programs barbell and dumbbell work and logs it in sets, reps, weights, and PRs. Freeletics builds its plans around bodyweight difficulty ratings, and gym programming is its weak side.",
    },
    {
      title: "A trainer you can message",
      body: "Ask why the week looks this way, what to do about a sore knee, whether to push today. The Freeletics AI Coach takes a difficulty tap and stays silent.",
    },
    {
      title: "Published, lower pricing",
      body: "$59.99 a year, printed on the website, against a reported ~$99.99 for Freeletics with no public pricing page. Forge also offers a $6.99 weekly plan.",
    },
    {
      title: "No add-on gates",
      body: "Every Forge feature sits inside the subscription. Freeletics charges separately for its Nutrition Coach.",
    },
  ],
  theirPricing: [
    { label: "Monthly", value: "~$34.99" },
    { label: "Yearly", value: "~$99.99" },
    { label: "Lifetime", value: "~$469.99" },
  ],
  theirPricingNote:
    "Freeletics does not publish prices openly. These figures come from user reports and past listings as of early 2026, and they vary by region and subscription term. Treat them as approximate.",
  whoShouldPickThem: [
    "You want structured bodyweight and HIIT training anywhere",
    "You like audio coaching talking you through a session",
    "You run and want one app covering both road and strength",
    "You are self-motivated and only need the plan, priced per term",
  ],
  whoShouldPickForge: [
    "You train with barbells and dumbbells and track PRs",
    "You want a coach who answers questions any hour",
    "You want the price published before you download",
    "You are newer to training and want a gentler first month",
  ],
  faqs: [
    {
      question: "Is Forge or Freeletics cheaper?",
      answer:
        "Forge, on every published number. Forge lists $19.99 monthly, $59.99 yearly, and $6.99 weekly. Freeletics does not publish prices, and reported figures land around $34.99 monthly or $99.99 yearly depending on region and term. The Nutrition Coach costs extra on top.",
    },
    {
      question: "Is Freeletics good for building muscle with weights?",
      answer:
        "Bodyweight and HIIT are the core of the product, and the barbell and dumbbell programming runs thin by comparison. If your training centers on a rack and a barbell, Forge's strength plans and set-by-set logging fit better. If your training is a mat and a pull-up bar, Freeletics is the stronger pick.",
    },
    {
      question: "Does Freeletics have a real coach?",
      answer:
        "The AI Coach is a plan algorithm. It adjusts from your post-workout difficulty ratings, your equipment, and your schedule, which covers programming well. There is no way to ask it a question. Forge's trainers answer around the clock in four distinct personalities.",
    },
    {
      question: "Does Forge work on Apple Watch?",
      answer:
        "No. Freeletics ships an Apple Watch companion app, and Forge runs on iPhone and Android only. If wrist logging matters to you, Freeletics wins that point.",
    },
    {
      question: "Which is better for beginners?",
      answer:
        "Freeletics assumes a base level of fitness, and its opening weeks bury some true beginners. Forge starts gentler. Tell your trainer how sore you are in plain words and the plan adjusts. A returning exerciser will have an easier first month in Forge.",
    },
    {
      question: "Does either app do nutrition?",
      answer:
        "Freeletics sells a separate Nutrition Coach add-on. Forge is workout-only by design and puts its entire effort into training, logging, and coaching.",
    },
  ],
  metaTitle: "Forge vs Freeletics (2026) - An Honest Comparison",
  metaDescription:
    "Forge vs Freeletics compared honestly: bodyweight HIIT and audio coaching vs real strength training with a trainer you can message. Prices, rows, verdict.",
  keywords: [
    "forge vs freeletics",
    "freeletics alternative",
    "freeletics review",
    "best ai workout app",
    "freeletics vs ai trainer",
  ],
};

export default freeletics;
