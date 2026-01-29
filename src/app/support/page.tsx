import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Forge AI Fitness. Contact support, manage your subscription, troubleshoot issues, and find answers to common questions.",
  keywords: "Forge support, help, contact, FAQ, cancel subscription, fitness app support",
  alternates: {
    canonical: "https://forgetrainer.ai/support",
  },
};

function getSupportContent(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "support-content.md");
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "Unable to load content. Please try again later.";
  }
}

export default function SupportPage() {
  const content = getSupportContent();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Support", url: "https://forgetrainer.ai/support" },
        ]}
      />
      <main className="flex-1 container py-24 md:py-32">
        <article className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
          <MarkdownContent content={content} />
        </article>
      </main>
    </div>
  );
}
