import Section from "../ui/section";
import ExpCard from "../experiencecard/expcard";
import { experience, education } from "../../data/content";

const Exp = () => {
  return (
    <Section
      id="experience"
      title={["Experience", "& Education"]}
      meta="Shipping production work while finishing my degree."
    >
      <div className="flex flex-col gap-2">
        {experience.map((job) => (
          <ExpCard
            key={`${job.company}-${job.role}`}
            title={job.role}
            subtitle={job.company}
            desc={job.desc}
            logo={job.logo}
            period={job.period}
            current={job.current}
          />
        ))}

        {education.map((item) => (
          <ExpCard
            key={item.school}
            title={item.school}
            desc={item.desc}
            logo={item.logo}
            period={item.period}
            href={item.href}
          />
        ))}
      </div>
    </Section>
  );
};

export default Exp;
