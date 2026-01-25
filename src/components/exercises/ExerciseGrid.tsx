"use client";

import { motion } from "framer-motion";
import type { Exercise } from "@/types/exercise";
import ExerciseCard from "./ExerciseCard";

interface ExerciseGridProps {
  exercises: Exercise[];
  priorityCount?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ExerciseGrid({
  exercises,
  priorityCount = 2,
}: ExerciseGridProps) {
  if (exercises.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary font-barlow">
          No exercises found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {exercises.map((exercise, index) => (
        <motion.div key={exercise.id} variants={itemVariants}>
          <ExerciseCard
            exercise={exercise}
            priority={index < priorityCount}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
