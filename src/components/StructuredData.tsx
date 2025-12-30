import { useEffect } from "react";

interface ArticleStructuredDataProps {
  type: "article";
  title: string;
  description: string;
  publishedTime: string;
  author: string;
  url: string;
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

type StructuredDataProps = ArticleStructuredDataProps | BreadcrumbStructuredDataProps | OrganizationStructuredDataProps | WebSiteStructuredDataProps;

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