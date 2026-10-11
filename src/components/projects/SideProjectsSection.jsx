import { ArrowUpRight } from "lucide-react";
import {
  SiGooglecolab,
  SiGooglegemini,
  SiGithub,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiDrizzle,
  SiRazorpay,
  SiFastapi,
  SiPython,
  SiMongodb,
  SiTensorflow,
  SiKeras,
  SiNumpy,
  SiTurborepo,
  SiTypescript,
  SiSocketdotio,
  SiExpress,
} from "react-icons/si";
import { sideProjects } from "../../data/content";

function ProjectLogo({ id, title }) {
  switch (id) {
    case "feedu":
      return (
        <img
          src="/feedu_logo.png"
          alt={title}
          className="w-9 h-9 rounded-lg object-cover shrink-0 mt-0.5"
        />
      );
    case "cifar":
      return (
        <span className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5" title="Google Colab">
          <SiGooglecolab className="w-7 h-7" style={{ color: "#F9AB00" }} />
        </span>
      );
    case "codebase":
      return (
        <span className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5" title="Google Gemini">
          <SiGooglegemini className="w-6 h-6" style={{ color: "#8E75B2" }} />
        </span>
      );
    case "fluke":
    default:
      return (
        <span className="w-9 h-9 flex items-center justify-center text-[var(--surface-ink)] shrink-0 mt-0.5" title="GitHub Repository">
          <SiGithub className="w-6 h-6" />
        </span>
      );
  }
}

function TechIcon({ tag }) {
  switch (tag) {
    case "React":
      return <SiReact className="w-3 h-3 shrink-0" style={{ color: "#61DAFB" }} />;
    case "Node":
    case "Node.js":
      return <SiNodedotjs className="w-3 h-3 shrink-0" style={{ color: "#5FA04E" }} />;
    case "PostgreSQL":
      return <SiPostgresql className="w-3 h-3 shrink-0" style={{ color: "#4169E1" }} />;
    case "Drizzle ORM":
      return <SiDrizzle className="w-3 h-3 shrink-0" style={{ color: "#85B816" }} />;
    case "Razorpay":
      return <SiRazorpay className="w-3 h-3 shrink-0" style={{ color: "#3395FF" }} />;
    case "FastAPI":
      return <SiFastapi className="w-3 h-3 shrink-0" style={{ color: "#009688" }} />;
    case "Python":
      return <SiPython className="w-3 h-3 shrink-0" style={{ color: "#3776AB" }} />;
    case "ChromaDB":
      return (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="13" r="5" fill="#FF6446" />
          <circle cx="15" cy="13" r="5" fill="#FFB800" />
          <circle cx="12" cy="8" r="5" fill="#3B82F6" />
        </svg>
      );
    case "Gemini 2.5":
      return <SiGooglegemini className="w-3 h-3 shrink-0" style={{ color: "#8E75B2" }} />;
    case "MongoDB":
      return <SiMongodb className="w-3 h-3 shrink-0" style={{ color: "#47A248" }} />;
    case "TensorFlow":
      return <SiTensorflow className="w-3 h-3 shrink-0" style={{ color: "#FF6F00" }} />;
    case "Keras":
      return <SiKeras className="w-3 h-3 shrink-0" style={{ color: "#D00000" }} />;
    case "NumPy":
      return <SiNumpy className="w-3 h-3 shrink-0" style={{ color: "#4DABCF" }} />;
    case "Turborepo":
      return <SiTurborepo className="w-3 h-3 shrink-0" style={{ color: "#EF4444" }} />;
    case "TypeScript":
      return <SiTypescript className="w-3 h-3 shrink-0" style={{ color: "#3178C6" }} />;
    case "Socket.IO":
      return <SiSocketdotio className="w-3 h-3 shrink-0 text-[var(--surface-ink)]" />;
    case "Zustand":
      return (
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="7" r="3.2" fill="#9A3412" />
          <circle cx="17" cy="7" r="3.2" fill="#9A3412" />
          <circle cx="12" cy="13" r="6.5" fill="#EA580C" />
        </svg>
      );
    case "Express":
      return <SiExpress className="w-3 h-3 shrink-0 text-[var(--surface-ink)]" />;
    default:
      return null;
  }
}

export default function SideProjectsSection() {
  return (
    <section className="side-projects-section" aria-labelledby="side-projects-heading">
      <div className="section-intro mb-10 sm:mb-12">
        <h2
          id="side-projects-heading"
          className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
        >
          some side projects
        </h2>
      </div>

      <ul className="side-projects-list grid gap-8 list-none p-0 m-0">
        {sideProjects.map((project) => (
          <li key={project.id}>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="side-project group flex items-start gap-4 text-inherit no-underline rounded-xl p-3 -mx-3 hover:bg-[var(--surface-card-subtle)] transition-colors"
            >
              {/* Actual Project / Platform Logo */}
              <ProjectLogo id={project.id} title={project.title} />

              {/* Project Content */}
              <div className="side-project__copy min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <strong className="text-[16px] font-bold text-[var(--surface-ink)]">
                    {project.title}
                  </strong>
                  <span className="text-[11px] font-mono text-[var(--surface-muted)] bg-[var(--surface-card-subtle)] border border-[var(--surface-border)] px-2 py-0.5 rounded-sm">
                    {project.kicker}
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--surface-ink)]"
                  />
                </div>
                <p className="text-[13px] text-[var(--surface-muted)] font-medium leading-relaxed mt-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  {project.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--surface-ink)] bg-[var(--surface-card-subtle)] border border-[var(--surface-border)] px-2 py-0.5 rounded-md"
                    >
                      <TechIcon tag={t} />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
