import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrainerBySlug, trainers } from "@/content/trainers";
import TrainerPageContent from "./TrainerPageContent";

interface TrainerPageProps {
  params: Promise<{ trainer: string }>;
}

const trainerMeta: Record<string, { title: string; description: string }> = {
  "sergeant-stone": {
    title: "Sergeant Stone - Drill Instructor AI Trainer",
    description:
      "Train with Sergeant Stone, Forge's ex-military drill instructor AI trainer. Tough love, no excuses, and zero mercy. For people who need their limits pushed.",
  },
  maya: {
    title: "Maya - Supportive AI Personal Trainer",
    description:
      "Train with Maya, Forge's gentle and encouraging AI personal trainer. Patient guidance, positive reinforcement, and a judgment-free fitness experience.",
  },
  mike: {
    title: "Mike - Casual AI Gym Buddy Trainer",
    description:
      "Train with Mike, Forge's casual and friendly AI trainer. Fun workouts, practical advice, and a gym buddy vibe that makes fitness enjoyable.",
  },
  reese: {
    title: "Reese - Data-Driven AI Fitness Coach",
    description:
      "Train with Reese, Forge's data-driven AI fitness coach. Perfect form, evidence-based programming, and meticulous attention to technique.",
  },
};

export async function generateMetadata({ params }: TrainerPageProps): Promise<Metadata> {
  const { trainer: trainerSlug } = await params;
  const trainer = getTrainerBySlug(trainerSlug);

  if (!trainer) {
    return {};
  }

  const meta = trainerMeta[trainerSlug] || {
    title: `${trainer.name} - AI Personal Trainer`,
    description: trainer.description,
  };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://forgetrainer.ai/trainers/${trainerSlug}`,
      images: [{ url: trainer.avatarUrl }],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://forgetrainer.ai/trainers/${trainerSlug}`,
      types: {
        "text/markdown": `/markdown/trainers/${trainerSlug}.md`,
      },
    },
  };
}

export function generateStaticParams() {
  return trainers.map((trainer) => ({
    trainer: trainer.slug,
  }));
}

export default async function TrainerPage({ params }: TrainerPageProps) {
  const { trainer: trainerSlug } = await params;
  const trainer = getTrainerBySlug(trainerSlug);

  if (!trainer) {
    notFound();
  }

  return <TrainerPageContent trainerSlug={trainerSlug} />;
}
