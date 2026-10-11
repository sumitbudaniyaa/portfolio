import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiTailwindcss,
  SiSocketdotio,
  SiHtml5,
  SiTurborepo,
  SiRazorpay,
  SiPostgresql,
  SiSupabase,
  SiDrizzle,
  SiMongodb,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
  SiGooglegemini,
  SiClaude,
  SiOpenai,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
} from "react-icons/si";
import { Database } from "lucide-react";

import { ToolDock, ToolDockTile, type ToolDockItem } from "@/components/ui/techstack";

function brandTile(
  label: string,
  Icon: IconType,
  bg: string,
  color: string,
  sizeClass = "size-[56%]",
): ToolDockItem {
  return {
    label,
    icon: (
      <ToolDockTile style={{ backgroundColor: bg }}>
        <Icon aria-hidden className={sizeClass} style={{ color }} />
      </ToolDockTile>
    ),
  };
}

export const fullStackAndInfraItems: ToolDockItem[] = [
  brandTile("Claude", SiClaude, "#d76f4d", "#ffffff", "size-[58%]"),
  brandTile("ChatGPT", SiOpenai, "#10a37f", "#ffffff", "size-[58%]"),
  brandTile("TypeScript", SiTypescript, "#3178C6", "#ffffff", "size-[56%]"),
  brandTile("JavaScript", SiJavascript, "#F7DF1E", "#000000", "size-[56%]"),
  brandTile("Python", SiPython, "#1e293b", "#38BDF8", "size-[58%]"),
  brandTile("C / C++", SiCplusplus, "#00599C", "#ffffff", "size-[58%]"),
  brandTile("React", SiReact, "#161b22", "#61DAFB", "size-[60%]"),
  brandTile("Next.js 16", SiNextdotjs, "#000000", "#ffffff", "size-[58%]"),
  brandTile("Node.js", SiNodedotjs, "#ffffff", "#5FA04E", "size-[58%]"),
  brandTile("Express.js", SiExpress, "#18181b", "#ffffff", "size-[58%]"),
  brandTile("FastAPI", SiFastapi, "#009688", "#ffffff", "size-[58%]"),
  brandTile("Tailwind CSS", SiTailwindcss, "#ffffff", "#06B6D4", "size-[60%]"),
  brandTile("Socket.IO", SiSocketdotio, "#010101", "#ffffff", "size-[58%]"),
  {
    label: "Zustand",
    icon: (
      <ToolDockTile style={{ backgroundColor: "#fff7ed" }}>
        <svg viewBox="0 0 24 24" aria-hidden className="size-[62%]">
          <circle cx="7" cy="7" r="3.2" fill="#9A3412" />
          <circle cx="17" cy="7" r="3.2" fill="#9A3412" />
          <circle cx="12" cy="13" r="6.5" fill="#EA580C" />
          <circle cx="9.8" cy="11.5" r="1.1" fill="#ffffff" />
          <circle cx="14.2" cy="11.5" r="1.1" fill="#ffffff" />
          <ellipse cx="12" cy="14.3" rx="2.2" ry="1.5" fill="#FED7AA" />
        </svg>
      </ToolDockTile>
    ),
  },
  brandTile("Turborepo", SiTurborepo, "#0f172a", "#EF4444", "size-[58%]"),
  brandTile("Razorpay API", SiRazorpay, "#072654", "#3395FF", "size-[58%]"),
];

export const aiDataAndCloudItems: ToolDockItem[] = [
  brandTile("Gemini 2.5 Flash", SiGooglegemini, "#0f172a", "#8E75B2", "size-[58%]"),
  brandTile("PyTorch", SiPytorch, "#ffffff", "#EE4C2C", "size-[58%]"),
  brandTile("TensorFlow", SiTensorflow, "#fff7ed", "#FF6F00", "size-[58%]"),
  brandTile("Keras", SiKeras, "#D00000", "#ffffff", "size-[56%]"),
  brandTile("scikit-learn", SiScikitlearn, "#ffffff", "#F7931E", "size-[64%]"),
  brandTile("NumPy", SiNumpy, "#013243", "#4DABCF", "size-[58%]"),
  brandTile("Pandas", SiPandas, "#150458", "#ffffff", "size-[58%]"),
  brandTile("PostgreSQL", SiPostgresql, "#336791", "#ffffff", "size-[58%]"),
  brandTile("Supabase", SiSupabase, "#171717", "#3ECF8E", "size-[56%]"),
  brandTile("Drizzle ORM", SiDrizzle, "#111827", "#C5F74F", "size-[58%]"),
  brandTile("MongoDB", SiMongodb, "#001E2B", "#00ED64", "size-[58%]"),
  {
    label: "ChromaDB (Vector)",
    icon: (
      <ToolDockTile style={{ backgroundColor: "#ffffff" }}>
        <svg viewBox="0 0 24 24" aria-hidden className="size-[64%]">
          <circle cx="9" cy="13.5" r="5" fill="#FF6446" />
          <circle cx="15" cy="13.5" r="5" fill="#FFB800" />
          <circle cx="12" cy="8.5" r="5" fill="#3B82F6" />
        </svg>
      </ToolDockTile>
    ),
  },
  {
    label: "SQL",
    icon: (
      <ToolDockTile style={{ backgroundColor: "#1e293b" }}>
        <Database aria-hidden className="size-[56%]" style={{ color: "#38BDF8" }} />
      </ToolDockTile>
    ),
  },
  brandTile("Docker", SiDocker, "#2496ED", "#ffffff", "size-[60%]"),
  brandTile("Git", SiGit, "#ffffff", "#F05032", "size-[58%]"),
  brandTile("GitHub", SiGithub, "#0d1117", "#ffffff", "size-[58%]"),
  brandTile("Linux VPS", SiLinux, "#FCC624", "#000000", "size-[58%]"),
  brandTile("HTML5 & CSS3", SiHtml5, "#E34F26", "#ffffff", "size-[56%]"),
];

export default function ToolDockDemo() {
  return (
    <section className="tech-stack-section" aria-labelledby="tech-stack-heading">
      <div className="section-intro mb-8 sm:mb-10">
        <h2
          id="tech-stack-heading"
          className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
        >
          tech i use
        </h2>
      </div>
      <div className="flex flex-col items-center gap-4">
        <ToolDock items={fullStackAndInfraItems} label="Languages, Frameworks & Infrastructure" size={52} />
        <ToolDock items={aiDataAndCloudItems} label="Databases, AI/ML & DevOps" size={52} />
      </div>
    </section>
  );
}
