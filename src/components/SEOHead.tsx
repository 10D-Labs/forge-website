import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  noindex?: boolean;
  ogImage?: string;
  markdownUrl?: string; // For AI crawler discovery
}

const SEOHead = ({
  title,
  description,
  canonicalPath = "",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author,
  keywords,
  noindex = false,
  ogImage = "https://forgetrainer.ai/og-image.png",
  markdownUrl,
}: SEOHeadProps) => {
  const baseUrl = "https://forgetrainer.ai";
  const fullUrl = `${baseUrl}${canonicalPath}`;
  const fullTitle = title.includes("Forge") ? title : `${title} | Forge`;
  const truncatedDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tags
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

    // Primary meta tags
    updateMeta("description", truncatedDescription);
    updateMeta("title", fullTitle);
    if (keywords) {
      updateMeta("keywords", keywords);
    }

    // Robot directives
    updateMeta("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");

    // Open Graph meta tags
    updateMeta("og:title", fullTitle, true);
    updateMeta("og:description", truncatedDescription, true);
    updateMeta("og:url", fullUrl, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("og:image:alt", `${title} - Forge AI Fitness Trainer`, true);
    updateMeta("og:site_name", "Forge", true);
    updateMeta("og:locale", "en_US", true);

    // Twitter Card meta tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", fullTitle);
    updateMeta("twitter:description", truncatedDescription);
    updateMeta("twitter:image", ogImage);
    updateMeta("twitter:image:alt", `${title} - Forge AI Fitness Trainer`);
    updateMeta("twitter:site", "@forgetrainer");

    // Article-specific meta tags
    if (ogType === "article") {
      if (publishedTime) {
        updateMeta("article:published_time", publishedTime, true);
      }
      if (modifiedTime) {
        updateMeta("article:modified_time", modifiedTime, true);
      }
      if (author) {
        updateMeta("article:author", author, true);
      }
      updateMeta("article:section", "Fitness", true);
      updateMeta("article:tag", "AI Fitness, Personal Training, Workout Plans", true);
    }

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // Update markdown discovery link (for AI crawlers)
    let markdownLink = document.querySelector('link[rel="alternate"][type="text/markdown"]');
    if (markdownUrl) {
      if (!markdownLink) {
        markdownLink = document.createElement("link");
        markdownLink.setAttribute("rel", "alternate");
        markdownLink.setAttribute("type", "text/markdown");
        document.head.appendChild(markdownLink);
      }
      markdownLink.setAttribute("href", `${baseUrl}${markdownUrl}`);
    } else if (markdownLink) {
      markdownLink.remove();
    }

    return () => {
      // Reset to defaults on unmount
      document.title = "Forge - Your Personal AI Fitness Trainer | Custom Workouts & 24/7 Guidance";
    };
  }, [fullTitle, truncatedDescription, fullUrl, ogType, publishedTime, modifiedTime, author, keywords, noindex, ogImage, markdownUrl]);

  return null;
};

export default SEOHead;