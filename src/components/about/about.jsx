import Section from "../ui/section";
import { profile } from "../../data/content";

const About = () => {
  return (
    <Section id="about" title={["About", "Me"]}>
      <div className="flex flex-col gap-6">
        <p className="font-display text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-fg">
          I&apos;m a 4th-year B.Tech CSE (Data Science) student at Manipal
          University Jaipur with hands-on experience across full-stack
          development and AI/ML engineering.
        </p>

        <div className="space-y-4 text-[0.95rem] leading-relaxed text-fg-soft">
          {profile.about.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
