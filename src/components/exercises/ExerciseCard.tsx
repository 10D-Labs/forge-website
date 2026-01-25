"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Exercise } from "@/types/exercise";
import { slugify, getExerciseGifUrl, getExerciseVideoUrl } from "@/lib/exercises";

interface ExerciseCardProps {
  exercise: Exercise;
  priority?: boolean;
}

export default function ExerciseCard({
  exercise,
  priority = false,
}: ExerciseCardProps) {
  const slug = slugify(exercise.name);
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(priority);

  useEffect(() => {
    if (priority) return; // Already visible if priority

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <motion.article
      ref={cardRef}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link
        href={`/exercise/${slug}`}
        className="block h-full angular-border card-neon transition-all duration-300 hover:[--angular-border-color:hsl(var(--primary)/0.5)] overflow-hidden"
      >
        {/* Video Preview */}
        <div className="relative aspect-square bg-surface-2 overflow-hidden">
          {isVisible ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              aria-label={`${exercise.name} demonstration`}
            >
              <source src={getExerciseVideoUrl(exercise)} type="video/webm" />
              <source src={getExerciseGifUrl(exercise)} type="image/gif" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-surface-2 animate-pulse" />
          )}
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
