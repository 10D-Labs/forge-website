import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const TermsOfService = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/terms-of-service-content.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load terms of service");
        return res.text();
      })
      .then((markdown) => {
        setContent(markdown);
      })
      .catch((err) => {
        console.error("Failed to load terms of service:", err);
        setContent("Unable to load terms of service. Please try again later.");
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
        <article className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
