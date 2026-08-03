import { Award, ScrollText, Trophy } from "lucide-react";
import Section from "../ui/section";
import { achievements } from "../../data/content";

const icons = {
  trophy: Trophy,
  patent: ScrollText,
  award: Award,
};

const Achievements = () => {
  return (
    <Section
      id="achievements"
      title={["Recognition"]}
      meta="Competitions, research and academics outside the day-to-day build work."
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {achievements.map(({ icon, title, desc }) => {
          const Icon = icons[icon] ?? Award;

          return (
            <div key={title} className="card flex flex-col gap-4 p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-2 text-flame">
                <Icon size={17} strokeWidth={1.75} />
              </span>

              <div>
                <h3 className="font-display text-[1rem] font-bold tracking-[-0.015em] text-fg">
                  {title}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-fg-soft">
                  {desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Achievements;
