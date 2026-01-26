import fs from 'fs';

let content = fs.readFileSync('src/app/exercises/muscle/[muscle]/page.tsx', 'utf8');

// Add FAQ imports
content = content.replace(
  `import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  SchemaScript,
} from "@/lib/seo/schema-generators";`,
  `import {
  generateExerciseListSchema,
  generateHubBreadcrumbs,
  generateFAQSchema,
  generateMuscleFAQs,
  SchemaScript,
} from "@/lib/seo/schema-generators";`
);

// Add FAQ schema generation
content = content.replace(
  `const breadcrumbSchema = generateHubBreadcrumbs("muscle", muscle, muscleSlug);`,
  `const breadcrumbSchema = generateHubBreadcrumbs("muscle", muscle, muscleSlug);
  
  // Generate FAQ schema with top exercises
  const topExerciseNames = exercises.slice(0, 5).map((e) => e.name);
  const faqs = generateMuscleFAQs(muscle, exercises.length, topExerciseNames);
  const faqSchema = generateFAQSchema(faqs);`
);

// Add FAQ SchemaScript
content = content.replace(
  `<SchemaScript schema={breadcrumbSchema} />`,
  `<SchemaScript schema={breadcrumbSchema} />
      <SchemaScript schema={faqSchema} />`
);

// Add FAQ section before CTA
const faqSection = `
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-surface-0 border-t border-border-subtle">
        <div className="container max-w-4xl">
          <h2 className="font-barlow-condensed text-2xl md:text-3xl font-bold uppercase mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="angular-border p-6 bg-surface-1">
                <h3 className="font-barlow-condensed text-lg font-bold mb-3">
                  {faq.question}
                </h3>
                <p className="font-barlow text-text-secondary">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

`;

content = content.replace(
  `{/* CTA Section */}`,
  faqSection + `{/* CTA Section */}`
);

fs.writeFileSync('src/app/exercises/muscle/[muscle]/page.tsx', content);
console.log('Muscle hub page updated with FAQ schema');
