# Post-Launch Updates Checklist

Update these items once Forge launches with real pricing and user data.

## Schema Updates (src/pages/Index.tsx)

- [ ] **Update SoftwareApplication offers**
  - Change `price: "0"` to actual subscription price
  - Change `priceCurrency: "USD"` if needed
  - Change `description` from "Join waitlist to be notified at launch" to actual offer description

- [ ] **Add aggregateRating** (once you have App Store/Play Store reviews)
  ```typescript
  // Add to StructuredData.tsx SoftwareApplicationStructuredDataProps
  aggregateRating?: {
    ratingValue: number;  // e.g., 4.8
    ratingCount: number;  // e.g., 1250
    bestRating: number;   // usually 5
    worstRating: number;  // usually 1
  };
  ```

## Content Updates

- [ ] **Homepage hero** - Remove/update waitlist messaging
- [ ] **CTASection** - Update call-to-action from waitlist to download/signup
- [ ] **WaitlistForm component** - Replace with app store links or signup flow
- [ ] **FAQ answers** - Update any references to waitlist or "coming soon"

## Markdown Files (for AI crawlers)

- [ ] **public/markdown/home.md** - Update pricing info, remove waitlist references
- [ ] **public/markdown/trainers/*.md** - Update any pre-launch language

## Other

- [ ] **Add app store links** to footer, header, CTAs
- [ ] **Update meta descriptions** with actual pricing/availability
- [ ] **Add download schema** once apps are in stores:
  ```json
  "installUrl": "https://apps.apple.com/app/forge/id...",
  "downloadUrl": "https://play.google.com/store/apps/details?id=..."
  ```

---

*Delete this file after completing all updates.*
