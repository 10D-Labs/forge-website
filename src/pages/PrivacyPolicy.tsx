import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/privacy-policy-content.html")
      .then((res) => res.text())
      .then((html) => setContent(html))
      .catch((err) => console.error("Failed to load privacy policy:", err));
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
