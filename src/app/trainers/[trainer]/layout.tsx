import type { Metadata } from "next";
import { getTrainerBySlug } from "@/content/trainers";

interface TrainerLayoutProps {
  children: React.ReactNode;
  params: Promise<{ trainer: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trainer: string }>;
}): Promise<Metadata> {
  const { trainer: trainerSlug } = await params;
  const trainer = getTrainerBySlug(trainerSlug);

  if (!trainer) {
    return {
      title: "Trainer Not Found",
    };
  }

  return {
    title: `${trainer.name} - ${trainer.role} AI Trainer`,
    description: `${trainer.description} ${trainer.fullDescription || ""}`.trim(),
    openGraph: {
      title: `${trainer.name} - ${trainer.role}`,
      description: trainer.description,
      url: `https://forgetrainer.ai/trainers/${trainerSlug}`,
      images: [
        {
          url: trainer.avatarUrl,
          alt: trainer.name,
        },
      ],
    },
    alternates: {
      types: {
        "text/markdown": `/markdown/trainers/${trainerSlug}.md`,
      },
    },
  };
}

export default function TrainerLayout({ children }: TrainerLayoutProps) {
  return children;
}
