import { ArrowUpRight, Github, Star } from "lucide-react";

/**
 * One project as a horizontal row: thumbnail tile, copy, corner arrow.
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
      {/* Typographic monogram tile — no logos in this section by design. */}
      <div className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-surface-2 sm:h-32 sm:w-32">
        <span className="font-display text-2xl font-bold uppercase tracking-[-0.03em] text-fg-faint transition-all duration-500 group-hover:scale-105 group-hover:text-flame sm:text-3xl">
          {title.slice(0, 2)}
        </span>

        {featured && (
          <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-lime text-bg">
            <Star size={9} fill="currentColor" />
          </span>
        )}
      </div>

      {/* Copy */}
      <div className="min-w-0 flex-1 py-0.5">
        <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-flame sm:text-[1.3rem]">
          {title}
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
