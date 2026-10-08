"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return <div>{items.map((faq) => (
    <details className="faq-item" key={faq.question} open={openQuestion === faq.question}>
      <summary onClick={(event) => {
        event.preventDefault();
        setOpenQuestion((current) => current === faq.question ? null : faq.question);
      }}>
        {faq.question}<Plus size={21} aria-hidden="true" />
      </summary>
      <p>{faq.answer}</p>
    </details>
  ))}</div>;
}
