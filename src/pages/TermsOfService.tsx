import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const TermsOfService = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/terms-of-service-content.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load terms of service");
        return res.text();
      })
      .then((html) => {
        // Sanitize HTML to prevent XSS attacks
        const clean = DOMPurify.sanitize(html, {
          ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'ul', 'ol', 'li', 
            'strong', 'em', 'span', 'div', 'br', 'table', 'thead', 'tbody', 
            'tr', 'th', 'td', 'style', 'bdt', 'img'
          ],
          ALLOWED_ATTR: [
            'href', 'class', 'data-custom-class', 'style', 'id', 'target', 
            'rel', 'src', 'alt'
          ],
          ALLOWED_URI_REGEXP: /^(?:https?:\/\/|mailto:|tel:|#)/i,
        });
        setContent(clean);
      })
      .catch((err) => {
        console.error("Failed to load terms of service:", err);
        setContent("<p>Unable to load terms of service. Please try again later.</p>");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Terms of Service - Forge AI Fitness"
        description="Terms of service for Forge AI Fitness Trainer. Read our terms and conditions for using the Forge fitness app."
        canonicalPath="/terms-of-service"
        keywords="Forge terms of service, fitness app terms, AI trainer conditions, user agreement fitness app"
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Terms of Service", url: "https://forgetrainer.ai/terms-of-service" },
        ]}
      />
      <Header />
      <main className="flex-1 container py-24 md:py-32">
        <div 
          className="prose prose-invert max-w-none [&_*]:!font-sans [&_*]:!text-foreground [&_[data-custom-class='title']]:!text-2xl [&_[data-custom-class='title']]:!font-bold [&_[data-custom-class='heading_1']]:!text-xl [&_[data-custom-class='heading_1']]:!font-semibold [&_[data-custom-class='heading_2']]:!text-lg [&_[data-custom-class='heading_2']]:!font-medium [&_[data-custom-class='link']]:!text-primary [&_a]:!text-primary [&_span[style*='display: block']]:hidden"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
