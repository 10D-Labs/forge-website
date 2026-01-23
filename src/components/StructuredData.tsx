"use client";

import { useEffect } from "react";

interface ArticleStructuredDataProps {
  type: "article";
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  url: string;
  image?: string;
  wordCount?: number;
  keywords?: string[];
  articleSection?: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  type: "breadcrumb";
  items: BreadcrumbItem[];
}

interface OrganizationStructuredDataProps {
  type: "organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
}

interface WebSiteStructuredDataProps {
  type: "website";
  name: string;
  url: string;
  searchUrlTemplate?: string;
}

interface SoftwareApplicationStructuredDataProps {
  type: "softwareApplication";
  name: string;
  alternateName?: string;
  description: string;
  applicationCategory: string;
  applicationSubCategory?: string;
  operatingSystem: string[];
  offers?: {
    price: string;
    priceCurrency: string;
    description?: string;
  };
  featureList?: string[];
  audienceType?: string;
  keywords?: string;
  datePublished?: string;
}

export interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  type: "faq";
  questions: FAQQuestion[];
}

interface PersonStructuredDataProps {
  type: "person";
  name: string;
  description: string;
  jobTitle?: string;
  knowsAbout?: string[];
  image?: string;
  memberOf?: {
    name: string;
    url?: string;
  };
  isVirtualCharacter?: boolean;
}

export interface HowToStep {
  name: string;
  text: string;
}

interface HowToStructuredDataProps {
  type: "howTo";
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format, e.g., "PT5M" for 5 minutes
}

type StructuredDataProps =
  | ArticleStructuredDataProps
  | BreadcrumbStructuredDataProps
  | OrganizationStructuredDataProps
  | WebSiteStructuredDataProps
  | SoftwareApplicationStructuredDataProps
  | FAQStructuredDataProps
  | PersonStructuredDataProps
  | HowToStructuredDataProps;

const StructuredData = (props: StructuredDataProps) => {
  useEffect(() => {
    const scriptId = `structured-data-${props.type}`;
    
    // Remove existing script if any
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    let data: object;

    if (props.type === "article") {
      data = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        datePublished: props.publishedTime,
        ...(props.modifiedTime && { dateModified: props.modifiedTime }),
        ...(props.image && { image: props.image }),
        ...(props.wordCount && { wordCount: props.wordCount }),
        ...(props.keywords && { keywords: props.keywords.join(", ") }),
        ...(props.articleSection && { articleSection: props.articleSection }),
        inLanguage: "en",
        isAccessibleForFree: true,
        author: {
          "@type": "Person",
          name: props.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Forge",
          logo: {
            "@type": "ImageObject",
            url: "https://forgetrainer.ai/icon-512.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": props.url,
        },
      };
    } else if (props.type === "softwareApplication") {
      data = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: props.name,
        ...(props.alternateName && { alternateName: props.alternateName }),
        applicationCategory: props.applicationCategory,
        ...(props.applicationSubCategory && { applicationSubCategory: props.applicationSubCategory }),
        operatingSystem: props.operatingSystem,
        description: props.description,
        ...(props.offers && {
          offers: {
            "@type": "Offer",
            price: props.offers.price,
            priceCurrency: props.offers.priceCurrency,
            ...(props.offers.description && { description: props.offers.description }),
          },
        }),
        ...(props.featureList && { featureList: props.featureList }),
        ...(props.audienceType && {
          audience: {
            "@type": "PeopleAudience",
            audienceType: props.audienceType,
          },
        }),
        ...(props.keywords && { keywords: props.keywords }),
        inLanguage: "en",
        ...(props.datePublished && { datePublished: props.datePublished }),
        provider: {
          "@type": "Organization",
          name: "Forge",
          url: "https://forgetrainer.ai",
        },
      };
    } else if (props.type === "faq") {
      data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: props.questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      };
    } else if (props.type === "person") {
      data = {
        "@context": "https://schema.org",
        "@type": "Person",
        ...(props.isVirtualCharacter && { additionalType: "VirtualCharacter" }),
        name: props.name,
        description: props.description,
        ...(props.jobTitle && { jobTitle: props.jobTitle }),
        ...(props.knowsAbout && { knowsAbout: props.knowsAbout }),
        ...(props.image && { image: props.image }),
        ...(props.memberOf && {
          memberOf: {
            "@type": "Organization",
            name: props.memberOf.name,
            ...(props.memberOf.url && { url: props.memberOf.url }),
          },
        }),
      };
    } else if (props.type === "breadcrumb") {
      data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: props.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
    } else if (props.type === "organization") {
      data = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: props.name,
        url: props.url,
        logo: props.logo,
        description: props.description,
        sameAs: props.sameAs || [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "support@forgetrainer.ai",
        },
      };
    } else if (props.type === "website") {
      data = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: props.name,
        url: props.url,
        potentialAction: props.searchUrlTemplate ? {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: props.searchUrlTemplate,
          },
          "query-input": "required name=search_term_string",
        } : undefined,
      };
    } else if (props.type === "howTo") {
      data = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: props.name,
        description: props.description,
        ...(props.totalTime && { totalTime: props.totalTime }),
        step: props.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      };
    } else {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [props]);

  return null;
};

export default StructuredData;