"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Exercise } from "@/types/exercise";
import { slugify, getExerciseGifUrl } from "@/lib/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  priority?: boolean;
}

export default function ExerciseCard({
  exercise,
  priority = false,
}: ExerciseCardProps) {
  const slug = slugify(exercise.name);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        href={`/exercise/${slug}`}
        className="block h-full angular-border card-neon transition-all duration-300 hover:[--angular-border-color:hsl(var(--primary)/0.5)] overflow-hidden"
      >
        {/* GIF Preview */}
        <div className="relative aspect-square bg-surface-2 overflow-hidden">
          <Image
            src={getExerciseGifUrl(exercise)}
            alt={`${exercise.name} demonstration`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
            priority={priority}
          />
          {/* Difficulty Badge */}
          <span
            className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-barlow-condensed font-semibold uppercase tracking-wide rounded ${
              exercise.difficulty === "Beginner"
                ? "bg-success/20 text-success"
                : exercise.difficulty === "Intermediate"
                ? "bg-primary/20 text-primary"
                : "bg-error/20 text-error"
            }`}
          >
            {exercise.difficulty}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mb-2 group-hover:text-primary transition-colors truncate">
            {exercise.name}
          </h3>

          <div className="flex flex-wrap gap-2 text-xs font-barlow text-text-tertiary">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {exercise.target}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-text-quaternary" />
              {exercise.equipment}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
