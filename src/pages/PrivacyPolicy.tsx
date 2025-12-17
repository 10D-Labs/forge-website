import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/privacy-policy-content.html")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load privacy policy");
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
        console.error("Failed to load privacy policy:", err);
        setContent("<p>Unable to load privacy policy. Please try again later.</p>");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
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

export default PrivacyPolicy;
