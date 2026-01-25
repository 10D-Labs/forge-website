interface InstructionsListProps {
  instructions: string[];
}

export default function InstructionsList({
  instructions,
}: InstructionsListProps) {
  return (
    <ol className="space-y-4">
      {instructions.map((instruction, index) => (
        <li key={index} className="flex gap-4">
          {/* Step Number */}
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary font-barlow-condensed font-bold text-sm flex items-center justify-center">
            {index + 1}
          </span>
          {/* Instruction Text */}
          <p className="font-barlow text-text-secondary leading-relaxed pt-1">
            {instruction}
          </p>
        </li>
      ))}
    </ol>
  );
}
