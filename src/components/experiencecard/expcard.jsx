import { ArrowUpRight } from "lucide-react";

/**
 * One row in the Experience / Education list. Renders as a link when
 * `href` is provided, otherwise a plain row.
 */
const ExpCard = ({ title, subtitle, desc, logo, period, current, href }) => {
  const Tag = href ? "a" : "div";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag {...linkProps} className="row group items-start">
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-line-soft bg-white p-1.5 sm:h-14 sm:w-14">
        <img
          src={logo}
          alt=""
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-display text-[1.1rem] font-bold tracking-[-0.02em] text-fg transition-colors duration-300 group-hover:text-flame sm:text-[1.25rem]">
            {title}
          </h3>

          <p className="flex shrink-0 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-fg-faint">
            {period}
            {current && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame" />
              </span>
            )}
          </p>
        </div>

        {subtitle && (
          <p className="mt-1 text-[0.88rem] text-fg-faint">{subtitle}</p>
        )}
        {desc && (
          <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-soft">
            {desc}
          </p>
        )}
      </div>

      {href && (
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="mt-1 hidden shrink-0 text-flame opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 sm:block"
        />
      )}
    </Tag>
  );
};

export default ExpCard;
