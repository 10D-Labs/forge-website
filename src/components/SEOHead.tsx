import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  author?: string;
}

const SEOHead = ({
  title,
  description,
  canonicalPath = "",
  ogType = "website",
  publishedTime,
  author,
}: SEOHeadProps) => {
  const baseUrl = "https://forgetrainer.ai";
  const fullUrl = `${baseUrl}${canonicalPath}`;
  const fullTitle = title.includes("Forge") ? title : `${title} | Forge`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", description, true);
    updateMeta("og:url", fullUrl, true);
    updateMeta("og:type", ogType, true);
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", description);

    if (ogType === "article" && publishedTime) {
      updateMeta("article:published_time", publishedTime, true);
    }
    if (author) {
      updateMeta("article:author", author, true);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    return () => {
      // Reset to defaults on unmount
      document.title = "Forge - Your Personal AI Fitness Trainer | Custom Workouts & 24/7 Guidance";
    };
  }, [fullTitle, description, fullUrl, ogType, publishedTime, author]);

  return null;
};

export default SEOHead;