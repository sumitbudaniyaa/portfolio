import { Mascot } from "page-mascot";
import {
  GithubIcon,
  Linkedin01Icon,
  Mail01Icon,
  File01Icon,
  Globe02Icon,
} from "hugeicons-react";
import { profile } from "../../data/content";

export default function HeroIntro() {
  return (
    <div className="hero-intro-container relative z-10 w-full max-w-[728px]">
      {/* Interactive CRT Page Mascot */}
      <div className="hero-intro mb-6 sm:mb-8">
        <div className="-mb-1 -ml-[16px] inline-block">
          <Mascot
            directions="/mascots/crt-directions.webp"
            reactions="/mascots/crt-reactions.webp"
            size={96}
          />
        </div>

        <h1 className="text-[34px] sm:text-[44px] font-bold tracking-tight leading-[1.05] text-[var(--surface-ink)]">
          hi, its sumit.
        </h1>

        <p className="mt-3 text-[18px] sm:text-[22px] font-medium tracking-tight text-[var(--surface-muted)]">
          software & ai engineer.
        </p>
      </div>

      {/* Clean High-Signal Editorial Narrative */}
      <div className="hero-body grid gap-5 text-[15px] sm:text-[16px] leading-[1.7] font-semibold text-[var(--surface-ink)] tracking-[-0.015em]">
        <p>
          I’m a final year Computer Science student at Manipal University Jaipur, passionate about building real world products from the ground up. I love experimenting with ideas, building SaaS products, and exploring the intersection of software, AI, and hardware. Currently curious about embedded systems and low level technologies, I enjoy understanding how things work under the hood and turning ideas into products people can actually use.
        </p>

        <p>
          I approach problems with a product first mindset and an engineer’s curiosity, identifying real world problems, building practical solutions, and improving them until they work. I’m interested in everything from full stack development and AI powered applications to embedded technologies and hardware, with a particular fascination for how software can interact with the physical world.
        </p>

        <p>
          I’m driven by the process of taking ideas from zero to one, experimenting, learning by building, and creating products that deliver tangible value. Always curious about new technologies, always building something, and constantly looking for interesting problems worth solving.
        </p>
      </div>

      {/* Contact & Links Strip with HugeIcons */}
      <section className="intro-contact mt-10" aria-label="Contact Sumit">
        <h2 className="text-[15px] font-semibold text-[var(--surface-ink)] mb-3">
          should we talk? we should talk.
        </h2>
        <nav className="intro-contact__links flex flex-wrap items-center gap-3 text-[13px] font-medium text-[var(--surface-muted)]">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-inherit hover:text-[var(--surface-ink)] transition-colors hover:scale-105"
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-inherit hover:text-[var(--surface-ink)] transition-colors hover:scale-105"
          >
            <Linkedin01Icon size={16} />
            <span>LinkedIn</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 text-inherit hover:text-[var(--surface-ink)] transition-colors hover:scale-105"
          >
            <Mail01Icon size={16} />
            <span>Email</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-inherit hover:text-[var(--surface-ink)] transition-colors hover:scale-105"
          >
            <File01Icon size={16} />
            <span>Resume</span>
          </a>
          <span className="opacity-30">|</span>
          <a
            href="https://twentyeleven.studio"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-inherit hover:text-[var(--surface-ink)] transition-colors hover:scale-105"
          >
            <Globe02Icon size={16} />
            <span>twentyeleven.studio</span>
          </a>
        </nav>
      </section>
    </div>
  );
}

