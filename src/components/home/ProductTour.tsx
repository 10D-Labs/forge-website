"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const steps = [
  { id: "plan", name: "Your plan", title: "A week that works for you.", description: "Tell Forge what you want to work toward and when you can train. Your coach builds your program around your experience and the equipment you have.", details: ["Your goals. Your schedule.", "Fits your experience level.", "Works with your equipment."], alt: "Forge workout plan with scheduled training days and rest days" },
  { id: "workout", name: "Your workout", title: "Know your next set.", description: "Open your session and follow the exercises, sets, and rep targets. Log what you lift as you go, with your coach's notes close at hand.", details: ["Guidance while you train.", "Your sets and reps, ready.", "Log each set as you go."], alt: "Forge on Android showing military press sets, targets, and a coach's note" },
  { id: "guidance", name: "Exercise guidance", title: "See how it's done.", description: "Check the exercise demo and read the instructions before your next set. Each movement has its own guide, ready when you need it.", details: ["Help with each movement.", "Watch a demo before you start.", "Follow step-by-step instructions."], alt: "Forge on Android showing a barbell deadlift demo and exercise instructions" },
  { id: "progress", name: "Your progress", title: "See the work add up.", description: "Keep your training history in one place. Look back at your logged workouts and track how your strength changes over time.", details: ["Your training, on record.", "Look back at past workouts.", "See your strength over time."], alt: "Forge progress screen with workout and strength tracking" },
];

export default function ProductTour() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const step = steps[active];
  return <section id="how-it-works" className="product-section section-space" aria-labelledby="product-heading">
    <div className="site-width">
      <div className="section-heading"><div><p className="eyebrow"><span>01</span> Inside Forge</p><h2 id="product-heading">Training that<br /><span className="muted-heading">fits your life.</span></h2></div><p>Take a look inside the app, from planning your week to logging your next workout.</p></div>
      <div className="product-tour">
        <div className="product-copy">
          <div className="product-tabs" role="tablist" aria-label="Explore the Forge app">
            {steps.map((item, index) => <button key={item.id} ref={(element) => { buttons.current[index] = element; }} role="tab" id={`tab-${item.id}`} aria-selected={index === active} aria-controls={`panel-${item.id}`} tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
              let next = active;
              if (event.key === "ArrowRight") next = (active + 1) % steps.length;
              else if (event.key === "ArrowLeft") next = (active + steps.length - 1) % steps.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = steps.length - 1;
              else return;
              event.preventDefault(); setActive(next); buttons.current[next]?.focus();
            }}><span>0{index + 1}</span>{item.name}</button>)}
          </div>
          {steps.map((item, index) => <div className="product-panel" role="tabpanel" id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} tabIndex={0} key={item.id} hidden={index !== active}>
            <h3>{item.title}</h3><p>{item.description}</p>
            <ul className="product-details">{item.details.map((detail) => <li className="product-detail" key={detail}><Check size={16} aria-hidden="true" />{detail}</li>)}</ul>
          </div>)}
        </div>
        <div className="product-screen-stage"><span className="screen-index" aria-hidden="true">0{active + 1} / 04</span><div className="tour-phone"><Image key={step.id} src={`/product/${step.id}-android-v2.webp`} alt={step.alt} width={1080} height={2410} sizes="(max-width: 600px) 240px, 280px" /></div><span className="screen-caption">Inside Forge 2.0 on Android</span></div>
      </div>
    </div>
  </section>;
}
