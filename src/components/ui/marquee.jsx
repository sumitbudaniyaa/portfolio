import { marquee } from "../../data/content";

const Track = ({ ariaHidden }) => (
  <div className="marquee-track" aria-hidden={ariaHidden || undefined}>
    {marquee.map((item) => (
      <span
        key={item}
        className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-[clamp(0.95rem,2vw,1.35rem)] font-semibold uppercase tracking-[-0.01em] text-fg-soft"
      >
        {item}
        <span aria-hidden="true" className="text-flame">
          ✦
        </span>
      </span>
    ))}
  </div>
);

/** Infinite scrolling skill ticker. Two identical tracks = seamless loop. */
const Marquee = () => (
  <div className="marquee rounded-2xl border border-line-soft bg-surface py-4">
    <Track />
    <Track ariaHidden />
  </div>
);

export default Marquee;
