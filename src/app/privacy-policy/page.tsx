import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "Privacy Policy - Forge AI Fitness",
  description:
    "Privacy policy for Forge AI Fitness Trainer. Learn how we collect, use, and protect your personal information.",
  keywords:
    "Forge privacy policy, fitness app data protection, AI trainer privacy, user data security, GDPR compliance fitness app",
  alternates: {
    canonical: "https://forgetrainer.ai/privacy-policy",
  },
};

function getPrivacyPolicyContent(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "privacy-policy-content.md");
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "Unable to load privacy policy. Please try again later.";
  }
}

export default function PrivacyPolicyPage() {
  const content = getPrivacyPolicyContent();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Privacy Policy", url: "https://forgetrainer.ai/privacy-policy" },
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
