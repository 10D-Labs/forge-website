import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "Terms of Service - Forge AI Fitness",
  description:
    "Terms of service for Forge AI Fitness Trainer. Read our terms and conditions for using the Forge fitness app.",
  keywords:
    "Forge terms of service, fitness app terms, AI trainer conditions, user agreement fitness app",
  alternates: {
    canonical: "https://forgetrainer.ai/terms-of-service",
  },
};

function getTermsOfServiceContent(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "terms-of-service-content.md");
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "Unable to load terms of service. Please try again later.";
  }
}

export default function TermsOfServicePage() {
  const content = getTermsOfServiceContent();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Terms of Service", url: "https://forgetrainer.ai/terms-of-service" },
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
