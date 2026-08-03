import { Award, FolderClosed, Home, PenLine, Wrench } from "lucide-react";
import { useActiveSection } from "../../hooks/useReveal";

const links = [
  { id: "home", label: "Home", Icon: Home },
  { id: "projects", label: "Projects", Icon: FolderClosed },
  { id: "experience", label: "Experience", Icon: Award },
  { id: "toolkit", label: "Toolkit", Icon: Wrench },
  { id: "contact", label: "Contact", Icon: PenLine },
];

/** Icon-only floating pill, centred at the top of the viewport. */
const Nav = () => {
  const active = useActiveSection(links.map((l) => l.id));

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav className="rounded-2xl border border-line bg-surface/85 p-1.5 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <ul className="flex items-center gap-1">
          {links.map(({ id, label, Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                title={label}
                aria-label={label}
                aria-current={active === id ? "page" : undefined}
                className={`group relative grid h-11 w-11 place-items-center rounded-xl transition-colors duration-200 sm:h-12 sm:w-12 ${
                  active === id
                    ? "bg-flame text-white"
                    : "text-fg-soft hover:bg-surface-2 hover:text-fg"
                }`}
              >
                <Icon size={19} strokeWidth={1.9} />
                <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-line bg-surface px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-fg-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-sm:hidden">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
