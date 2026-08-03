import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { profile } from "../../data/content";

const socials = [
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.github, label: "GitHub", Icon: Github },
];

const Footer = () => {
  const ref = useReveal();

  return (
    <footer
      id="contact"
      ref={ref}
      className="reveal scroll-mt-28 border-t border-line-soft py-14 sm:py-20"
    >
      <h2 className="display-sm">
        <span className="block">Let&apos;s work</span>
        <span className="block display-ghost">Together</span>
      </h2>

      <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-fg-soft">
        I&apos;m always open to interesting problems, internships and
        collaborations. The fastest way to reach me is email.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className="group mt-7 inline-flex items-center gap-2 font-display text-[clamp(1.05rem,2.6vw,1.75rem)] font-bold tracking-[-0.02em] text-fg no-underline transition-colors duration-300 hover:text-flame"
      >
        <span className="link-underline break-all">{profile.email}</span>
        <ArrowUpRight
          size={24}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>

      <div className="mt-12 flex flex-col gap-6 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-fg-soft transition-all duration-200 hover:border-flame hover:bg-flame hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
