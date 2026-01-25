"use client";

import type { Exercise } from "@/types/exercise";
import ExerciseCard from "./ExerciseCard";

interface RelatedExercisesProps {
  exercises: Exercise[];
  title?: string;
}

export default function RelatedExercises({
  exercises,
  title = "Related Exercises",
}: RelatedExercisesProps) {
  if (exercises.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-surface-0 border-t border-border-subtle">
      <div className="container">
        <h2 className="font-barlow-condensed text-2xl font-bold uppercase tracking-wide mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exercises.slice(0, 6).map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </section>
  );
}
