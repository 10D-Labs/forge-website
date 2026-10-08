import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import StructuredData from "@/components/StructuredData";
import StoreLinks from "@/components/home/StoreLinks";
import { getTrainerBySlug, trainers } from "@/content/trainers";
import { pricing, pricingSummary } from "@/content/pricing";

export default function TrainerPageContent({ trainerSlug }: { trainerSlug: string }) {
  const trainer = getTrainerBySlug(trainerSlug);
  if (!trainer) notFound();

  return <main className="trainer-page">
    <StructuredData type="breadcrumb" items={[
      { name: "Home", url: "https://forgetrainer.ai" },
      { name: "Coaches", url: "https://forgetrainer.ai/#trainers" },
      { name: trainer.name, url: `https://forgetrainer.ai/trainers/${trainer.slug}` },
    ]} />
    <StructuredData type="person" name={trainer.name}
      description={trainer.fullDescription || trainer.description}
      jobTitle="AI Personal Trainer"
      knowsAbout={["Workout planning", "Strength training", "Exercise technique"]}
      image={`https://forgetrainer.ai${trainer.avatarUrl}`}
      memberOf={{ name: "Forge", url: "https://forgetrainer.ai" }}
      isVirtualCharacter={true} />

    <section className="trainer-hero site-width" aria-labelledby="trainer-heading">
      <Link href="/#trainers" className="text-link trainer-back"><ArrowLeft size={16} aria-hidden="true" /> All four coaches</Link>
      <div className="trainer-hero-grid">
        <div className="trainer-intro">
          <p className="eyebrow"><span className="status-dot" /> {trainer.role} · AI coach</p>
          <h1 id="trainer-heading">{trainer.name}</h1>
          <h2>{trainer.vibe}</h2>
          <p className="trainer-description">{trainer.fullDescription}</p>
          <div className="trainer-download">
            <p>Try training with {trainer.name.split(" ")[0] === "Sergeant" ? "Stone" : trainer.name}.</p>
            <StoreLinks placement={`trainer-${trainer.slug}`} />
            <small>{pricing.trialDays}-day free trial. Choose your plan in the app.<br />{pricingSummary}</small>
          </div>
        </div>
        <div className="trainer-portrait">
          <Image src={trainer.avatarUrl} alt={`${trainer.name}, a Forge AI coach`}
            width={1254} height={1254} sizes="(max-width: 760px) 90vw, 45vw" quality={90} priority />
          <span className="trainer-portrait-caption">FORGE COACH {String(trainers.indexOf(trainer) + 1).padStart(2, "0")} / 04</span>
        </div>
      </div>
    </section>

    <section className="trainer-details section-space" aria-labelledby="style-heading">
      <div className="site-width trainer-details-grid">
        <div><p className="eyebrow"><span>01</span> The way you train</p><h2 id="style-heading">Your goals.<br />{trainer.name === "Sergeant Stone" ? "Stone" : trainer.name}'s style.</h2><p>Every Forge coach can help you build a plan around your goals, schedule, and equipment. Choose the voice you want along the way.</p></div>
        <div className="trainer-fit">
          <h3>What to expect</h3>
          <ul>{trainer.trainingStyle?.map((style) => <li key={style}>{style}</li>)}</ul>
          <h3>A good fit if...</h3>
          <ul>{trainer.bestFor?.map((fit) => <li key={fit}>{fit}</li>)}</ul>
        </div>
      </div>
    </section>

    <section className="site-width trainer-voice section-space" aria-labelledby="voice-heading">
      <p className="eyebrow" id="voice-heading"><span>02</span> Example coaching style</p>
      <blockquote>“{trainer.samplePhrases?.[0]}”</blockquote>
      <p>{trainer.name} is an AI character. This example shows the coaching tone.</p>
    </section>

    <section className="trainer-others section-space" aria-labelledby="other-coaches-heading">
      <div className="site-width">
        <div className="section-heading"><div><p className="eyebrow"><span>03</span> Find your fit</p><h2 id="other-coaches-heading">A different kind<br />of motivation?</h2></div><p>You can switch coaches in the app. Meet the other personalities.</p></div>
        <div className="trainer-other-grid">{trainers.filter((other) => other.slug !== trainer.slug).map((other) => <Link className="coach-card" href={`/trainers/${other.slug}`} key={other.slug}>
          <div className="coach-image"><Image src={other.avatarUrl} alt={`${other.name}, a Forge AI coach`} width={500} height={500} sizes="(max-width: 600px) 85vw, 30vw" /><span className="coach-tag">{other.role}</span></div>
          <div className="coach-info"><div><h3>{other.name}</h3></div><p>{other.description}</p></div>
        </Link>)}</div>
      </div>
    </section>
  </main>;
}
