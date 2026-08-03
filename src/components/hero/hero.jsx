import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "../../data/content";

const tones = {
  bright: "",
  accent: "display-accent",
  ghost: "display-ghost",
};

const Hero = () => {
  return (
    <section id="home" className="scroll-mt-28 pt-6 lg:pt-10">
      {/* Giant tonal display headline */}
      <h1 className="display">
        {profile.displayLines.map(({ text, tone }) => (
          <span
            key={text}
            className={`block ${tones[tone] ?? ""}`.trimEnd()}
          >
            {text}
          </span>
        ))}
      </h1>

      {/* Founder lockup. The wordmark ships dark-on-white with heavy
          padding, so it sits on a white chip and is cropped to the art. */}
      <a
        href={profile.company.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-line px-4 py-2.5 no-underline transition-colors duration-200 hover:border-flame"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-faint">
          {profile.company.role}
        </span>
        <span aria-hidden="true" className="h-4 w-px bg-line" />
        <span className="block overflow-hidden rounded-lg bg-white px-1">
          <img
            src={profile.company.logo}
            alt={profile.company.name}
            className="h-8 w-28 object-cover object-center"
          />
        </span>
        <ArrowUpRight
          size={15}
          className="shrink-0 text-flame transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>

      <p className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-fg-soft">
        {profile.tagline}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href="#projects" className="btn btn-primary group">
          See my work
          <ArrowDownRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </a>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
