export const pricing = {
  currency: "USD",
  trialDays: 7,
  plans: [
    { name: "Annual", price: "59.99", period: "year", billingDuration: "P1Y" },
    { name: "Monthly", price: "19.99", period: "month", billingDuration: "P1M" },
    { name: "Weekly", price: "6.99", period: "week", billingDuration: "P1W" },
  ],
} as const;

export const pricingSummary = pricing.plans
  .map((plan) => `$${plan.price}/${plan.period}`)
  .join(" · ") + ` (${pricing.currency})`;

export const pricingAnswer = `Forge offers a ${pricing.trialDays}-day free trial. Then choose $${pricing.plans[0].price} per year, billed yearly; $${pricing.plans[1].price} per month, billed monthly; or $${pricing.plans[2].price} per week, billed weekly. Prices are in ${pricing.currency}.`;
