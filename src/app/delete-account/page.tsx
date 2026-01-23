import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "Delete Account - Forge AI Fitness",
  description:
    "Delete your Forge account and all associated data. Learn what data is deleted and how to request account deletion.",
  keywords: "delete Forge account, remove fitness data, account deletion, data removal",
  alternates: {
    canonical: "https://forgetrainer.ai/delete-account",
  },
};

function getDeleteAccountContent(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "delete-account-content.md");
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "Unable to load content. Please try again later.";
  }
}

export default function DeleteAccountPage() {
  const content = getDeleteAccountContent();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StructuredData
        type="breadcrumb"
        items={[
          { name: "Home", url: "https://forgetrainer.ai" },
          { name: "Delete Account", url: "https://forgetrainer.ai/delete-account" },
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
