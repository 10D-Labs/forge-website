"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Exercise } from "@/types/exercise";
import { EQUIPMENT_SLUGS } from "@/types/exercise";
import { slugify, getExerciseGifUrl } from "@/lib/exercises";
import InstructionsList from "./InstructionsList";

interface ExerciseDetailProps {
  exercise: Exercise;
}

export default function ExerciseDetail({ exercise }: ExerciseDetailProps) {
  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - GIF */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-surface-2 angular-border">
                <Image
                  src={getExerciseGifUrl(exercise)}
                  alt={`${exercise.name} demonstration`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="angular-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Target Muscle
                  </p>
                  <p className="font-barlow-condensed font-bold text-primary">
                    {exercise.target}
                  </p>
                </div>
                <div className="angular-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Equipment
                  </p>
                  <p className="font-barlow-condensed font-bold">
                    {exercise.equipment}
                  </p>
                </div>
                <div className="angular-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Difficulty
                  </p>
                  <p
                    className={`font-barlow-condensed font-bold ${
                      exercise.difficulty === "Beginner"
                        ? "text-success"
                        : exercise.difficulty === "Intermediate"
                        ? "text-primary"
                        : "text-error"
                    }`}
                  >
                    {exercise.difficulty}
                  </p>
                </div>
                <div className="angular-border p-4 bg-surface-1">
                  <p className="text-xs font-barlow text-text-tertiary uppercase tracking-wide mb-1">
                    Category
                  </p>
                  <p className="font-barlow-condensed font-bold">
                    {exercise.category}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href={`/exercises/${slugify(exercise.bodyPart)}`}
                className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-primary uppercase tracking-wider angular-border-sm [--angular-bg:hsl(var(--primary)/0.1)] [--angular-border-color:hsl(var(--primary)/0.3)] hover:[--angular-border-color:hsl(var(--primary))] transition-colors"
              >
                {exercise.bodyPart}
              </Link>
              <Link
                href={`/exercises/equipment/${EQUIPMENT_SLUGS[exercise.equipment]}`}
                className="px-3 py-1 text-xs font-barlow-condensed font-semibold text-text-secondary uppercase tracking-wider angular-border-sm [--angular-bg:hsl(var(--text-secondary)/0.1)] [--angular-border-color:hsl(var(--text-secondary)/0.3)] hover:[--angular-border-color:hsl(var(--text-secondary))] transition-colors"
              >
                {exercise.equipment}
              </Link>
            </div>

            {/* Title */}
            <h1 className="font-barlow-condensed text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-6">
              {exercise.name}
            </h1>

            {/* Description */}
            <p className="font-barlow text-text-secondary text-lg leading-relaxed mb-8">
              {exercise.description}
            </p>

            {/* Secondary Muscles */}
            {exercise.secondaryMuscles.length > 0 && (
              <div className="mb-8">
                <h2 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide mb-3">
                  Also Works
                </h2>
                <div className="flex flex-wrap gap-2">
                  {exercise.secondaryMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-3 py-1 text-sm font-barlow bg-surface-2 rounded"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mb-8">
              <h2 className="font-barlow-condensed text-xl font-bold uppercase tracking-wide mb-6">
                How to Perform
              </h2>
              <InstructionsList instructions={exercise.instructions} />
            </div>

            {/* Pro Tips */}
            <div className="angular-border p-6 bg-primary/5 border-primary/20">
              <h3 className="font-barlow-condensed text-lg font-bold uppercase tracking-wide text-primary mb-3">
                Pro Tips
              </h3>
              <ul className="space-y-2 font-barlow text-text-secondary">
                <li className="flex items-baseline gap-2">
                  <span className="text-primary">•</span>
                  <span>Focus on controlled movements rather than speed</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-primary">•</span>
                  <span>Breathe out during the exertion phase</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-primary">•</span>
                  <span>Keep your core engaged throughout the movement</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
