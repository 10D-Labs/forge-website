interface PageIntroProps {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  id?: string;
}

export default function PageIntro({ eyebrow, title, accent, description, id = "page-heading" }: PageIntroProps) {
  return <section className="page-intro" aria-labelledby={id}>
    <div className="site-width page-intro-grid">
      <div><p className="eyebrow"><span className="status-dot" />{eyebrow}</p><h1 id={id}>{title}<br /><span>{accent}</span></h1></div>
      <p className="page-intro-description">{description}</p>
    </div>
  </section>;
}
