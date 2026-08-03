import { ArrowUpRight, Github, Star } from "lucide-react";

/**
 * One project as a text row: copy and a corner arrow. No imagery —
 * this section is deliberately logo-free.
 */
const ProjCard = ({
  title,
  kicker,
  desc,
  repo,
  live,
  liveLabel = "Live site",
  tags = [],
  featured,
}) => {
  const primary = live || repo;
  const Tag = primary ? "a" : "div";
  const linkProps = primary
    ? { href: primary, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag {...linkProps} className="row group items-start">
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="flex items-center gap-2 font-display text-[1.15rem] font-bold tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-flame sm:text-[1.3rem]">
          {title}
          {featured && (
            <Star
              size={13}
              aria-label="Featured"
              className="shrink-0 text-lime"
              fill="currentColor"
            />
          )}
        </h3>
        {kicker && (
          <p className="mt-0.5 text-[0.9rem] text-fg-faint">{kicker}</p>
        )}

        <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-soft">
          {desc}
        </p>

        {tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        )}

        {(live || repo) && (
          <div className="mt-3.5 flex flex-wrap items-center gap-4 text-[0.8rem]">
            {live && (
              <span className="inline-flex items-center gap-1.5 text-fg">
                <span className="link-underline">{liveLabel}</span>
                <ArrowUpRight size={13} />
              </span>
            )}
            {repo && (
              <span className="inline-flex items-center gap-1.5 text-fg-faint">
                <Github size={13} />
                <span className="link-underline">Source</span>
              </span>
            )}
          </div>
        )}
      </div>

      {primary && (
        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="mt-1 hidden shrink-0 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:block"
        />
      )}
    </Tag>
  );
};

export default ProjCard;
