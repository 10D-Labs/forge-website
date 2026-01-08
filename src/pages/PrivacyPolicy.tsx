import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const PrivacyPolicy = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/privacy-policy-content.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load privacy policy");
        return res.text();
      })
      .then((markdown) => {
        setContent(markdown);
      })
      .catch((err) => {
        console.error("Failed to load privacy policy:", err);
        setContent("Unable to load privacy policy. Please try again later.");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Privacy Policy - Forge AI Fitness"
        description="Privacy policy for Forge AI Fitness Trainer. Learn how we collect, use, and protect your personal information."
        canonicalPath="/privacy-policy"
        keywords="Forge privacy policy, fitness app data protection, AI trainer privacy, user data security, GDPR compliance fitness app"
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Privacy Policy", url: "https://forgetrainer.ai/privacy-policy" },
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

export default PrivacyPolicy;
