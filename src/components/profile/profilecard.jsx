import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/content";

const socials = [
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: profile.github, label: "GitHub", Icon: Github },
];

/**
 * The white identity panel. On large screens it stays pinned while the
 * content column scrolls past it; on small screens it's just the first card.
 */
const ProfileCard = () => {
  return (
    <div className="panel relative overflow-hidden p-5 sm:p-6">
      {/* Dashed arc sweeping behind the portrait, as in the reference. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 320 420"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M24 300 C 24 392, 296 392, 296 250"
          fill="none"
          stroke="var(--color-flame)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 12"
          opacity="0.85"
        />
        <path
          d="M40 96 C 60 20, 250 14, 292 92"
          fill="none"
          stroke="var(--color-flame)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 12"
          opacity="0.85"
        />
      </svg>

      <div className="relative">
        <div className="overflow-hidden rounded-[1.35rem]">
          <img
            src={profile.photo}
            alt={profile.name}
            width="440"
            height="480"
            className="aspect-11/12 w-full object-cover"
          />
        </div>

        <h2 className="mt-6 text-center font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-[-0.02em] text-[#111]">
          {profile.name}
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#e8e4df] text-flame transition-all duration-200 hover:bg-flame hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
