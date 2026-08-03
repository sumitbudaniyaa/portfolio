import Section from "../ui/section";
import ProjCard from "../projcard/projcard";
import { projects } from "../../data/content";

const MyProj = () => {
  return (
    <Section
      id="projects"
      title={["Recent", "Projects"]}
      meta="A few things I've designed, built and shipped — from multi-tenant SaaS to computer vision."
    >
      <div className="flex flex-col gap-2">
        {projects.map((proj) => (
          <ProjCard key={proj.title} {...proj} />
        ))}
      </div>
    </Section>
  );
};

export default MyProj;
