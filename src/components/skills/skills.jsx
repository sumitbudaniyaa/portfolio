import Section from "../ui/section";
import { toolkit } from "../../data/content";

const Skills = () => {
  return (
    <Section
      id="toolkit"
      title={["My", "Toolkit"]}
      meta="The stack I reach for across product engineering and machine learning."
    >
      <div className="flex flex-col gap-2">
        {toolkit.map((group) => (
          <div
            key={group.label}
            className="grid gap-3 rounded-3xl border border-line-soft p-5 transition-colors duration-300 hover:border-line sm:grid-cols-[9rem_1fr] sm:gap-5 sm:p-6"
          >
            <p className="eyebrow pt-1 text-flame">{group.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
