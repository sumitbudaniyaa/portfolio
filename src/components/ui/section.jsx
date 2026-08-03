import { useReveal } from "../../hooks/useReveal";

/**
 * Section shell. `title` is an array of lines rendered as the giant
 * uppercase heading — the first line reads bright, every line after it
 * recedes into the background as ghost type.
 */
const Section = ({ id, eyebrow, title, meta, children }) => {
  const ref = useReveal();

  return (
    <section id={id} ref={ref} className="reveal scroll-mt-28 py-14 sm:py-20">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}

      <h2 className="display-sm">
        {title.map((line, i) => (
          <span key={line} className={i === 0 ? "block" : "block display-ghost"}>
            {line}
          </span>
        ))}
      </h2>

      {meta && (
        <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-fg-soft">
          {meta}
        </p>
      )}

      <div className="mt-10">{children}</div>
    </section>
  );
};

export default Section;
