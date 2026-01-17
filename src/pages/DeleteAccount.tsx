import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";

const DeleteAccount = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch("/delete-account-content.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load delete account page");
        return res.text();
      })
      .then((markdown) => {
        setContent(markdown);
      })
      .catch((err) => {
        console.error("Failed to load delete account page:", err);
        setContent("Unable to load content. Please try again later.");
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Delete Account - Forge AI Fitness"
        description="Delete your Forge account and all associated data. Learn what data is deleted and how to request account deletion."
        canonicalPath="/delete-account"
        keywords="delete Forge account, remove fitness data, account deletion, data removal"
      />
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Delete Account", url: "https://forgetrainer.ai/delete-account" },
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

export default DeleteAccount;
