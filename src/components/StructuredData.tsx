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

type StructuredDataProps = ArticleStructuredDataProps | BreadcrumbStructuredDataProps;

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