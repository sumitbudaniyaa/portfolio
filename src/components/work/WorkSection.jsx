import { useState, useEffect, useRef } from "react";
import {
  Shield01Icon,
  FlashIcon,
  CreditCardIcon,
  Store01Icon,
  KitchenUtensilsIcon,
  File01Icon,
  Award01Icon,
  Award02Icon,
} from "hugeicons-react";
import { experienceCards } from "../../data/content";
import githubData from "../../data/github-contributions.json";
import ContributionSkyline from "../ui/contribution-skyline";

function CarouselCard({ card }) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = card.slides?.length || 0;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  const activeSlide = card.slides?.[activeSlideIndex];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "shield":
        return <Shield01Icon size={16} />;
      case "zap":
        return <FlashIcon size={16} />;
      case "credit-card":
        return <CreditCardIcon size={16} />;
      case "store":
        return <Store01Icon size={16} />;
      case "utensils":
        return <KitchenUtensilsIcon size={16} />;
      case "file-text":
        return <File01Icon size={16} />;
      case "trophy":
        return <Award02Icon size={16} />;
      case "award":
        return <Award01Icon size={16} />;
      default:
        return <File01Icon size={16} />;
    }
  };

  return (
    <article className="experience-card grid gap-6">
      {/* Brand & Role Header */}
      <div className="experience-brand flex items-start gap-4 sm:gap-5">
        <div className="brand-tile w-12 h-12 flex items-center justify-center shrink-0">
          {card.logo ? (
            <img
              src={card.logo}
              alt={card.brand}
              className={`w-full h-full object-contain ${
                card.id === "twentyeleven" ? "dark:invert" : ""
              } ${card.id === "muj" ? "rounded-lg" : ""}`}
            />
          ) : (
            <span className="text-[var(--surface-ink)] font-bold text-sm">{card.brand[0]}</span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-[17px] font-bold text-[var(--surface-ink)] leading-snug">{card.brand}</h3>
          <p className="text-[14px] font-medium text-[var(--surface-muted)] mt-0.5">{card.role}</p>
          <div className="flex items-center gap-2 text-[12px] text-[var(--surface-muted)] mt-1 font-medium">
            <span>{card.location}</span>
            <span className="opacity-40">·</span>
            <span>{card.period}</span>
          </div>
        </div>
      </div>

      {/* Show Screenshot if provided, otherwise interactive Carousel when slides exist */}
      {card.screenshot ? (
        <div className="work-screenshot pl-0 sm:pl-[68px]">
          <div className="w-full rounded-2xl overflow-hidden border border-[var(--surface-border)] shadow-sm">
            <img
              src={card.screenshot}
              alt={card.brand}
              className="w-full h-auto block"
              loading="lazy"
            />
          </div>
        </div>
      ) : card.slides && card.slides.length > 0 ? (
        /* Interactive Project Showcase Carousel */
        <div
          className="work-carousel grid gap-4 pl-0 sm:pl-[68px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="work-carousel__frame p-4 sm:p-7 rounded-2xl bg-[var(--surface-card-subtle)] border border-[var(--surface-border)]">
            <div className="work-carousel__viewport relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-xl bg-[var(--surface-card)] border border-[var(--surface-border)] shadow-xs p-5 sm:p-7 flex flex-col justify-between overflow-hidden">
              {/* Slide Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md font-semibold border border-emerald-200 dark:border-emerald-800/50">
                    {card.brand} · Architecture
                  </span>
                  <span className="text-[11px] text-[var(--surface-muted)] font-medium">
                    {activeSlideIndex + 1} of {totalSlides}
                  </span>
                </div>
                <h4 className="text-[17px] sm:text-[20px] font-bold text-[var(--surface-ink)] tracking-tight">
                  {activeSlide?.title}
                </h4>
                <p className="text-[13px] sm:text-[14px] text-[var(--surface-muted)] font-medium mt-1">
                  {activeSlide?.subtitle}
                </p>
              </div>

              {/* Metrics Pills */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-2 sm:my-3">
                {activeSlide?.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-2.5 rounded-lg bg-[var(--surface-card-subtle)] border border-[var(--surface-border)] text-center"
                  >
                    <p className="text-[10px] text-[var(--surface-muted)] font-medium uppercase tracking-wider">
                      {m.label}
                    </p>
                    <p className="text-[12px] sm:text-[13px] font-bold text-[var(--surface-ink)] mt-0.5 truncate">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description & Tags */}
              <div>
                <p className="text-[12px] sm:text-[13px] text-[var(--surface-ink)] line-clamp-2 leading-relaxed opacity-90">
                  {activeSlide?.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {activeSlide?.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] sm:text-[11px] font-medium bg-[var(--surface-card-subtle)] text-[var(--surface-muted)] border border-[var(--surface-border)] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Meta Controls */}
          <div className="work-carousel__meta flex flex-col items-center gap-2">
            {/* Progress Indicators */}
            <div className="work-carousel__indicators flex items-center gap-1.5" role="tablist">
              {card.slides?.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  className={`work-carousel__indicator transition-all duration-300 rounded-full h-1.5 ${
                    activeSlideIndex === idx
                      ? "w-10 bg-[var(--surface-ink)]"
                      : "w-1.5 bg-[var(--surface-muted)]/30 hover:bg-[var(--surface-muted)]/60"
                  }`}
                  aria-label={`Show ${slide.caption}`}
                  aria-pressed={activeSlideIndex === idx}
                />
              ))}
            </div>
            <p className="work-carousel__caption text-[12px] text-[var(--surface-muted)] font-medium">
              {activeSlide?.caption}
            </p>
          </div>
        </div>
      ) : null}

      {/* Project List Breakdown - Only rendered when projects exist */}
      {card.projects && card.projects.length > 0 && (
        <ul className="project-list grid gap-3 pl-0 sm:pl-[68px] list-none m-0">
          {card.projects.map((proj, idx) => (
            <li
              key={idx}
              className="group relative flex items-start justify-between gap-3 p-3 rounded-xl border border-transparent hover:border-[var(--surface-border)] hover:bg-[var(--surface-card-subtle)] transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <span className="project-icon mt-0.5 text-[var(--surface-muted)] group-hover:text-[var(--surface-ink)] transition-colors shrink-0">
                  {getIcon(proj.icon)}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[14px] font-semibold text-[var(--surface-ink)]">
                      {proj.title}
                    </h4>
                    {proj.award && (
                      <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 dark:border-amber-700/50 shadow-2xs">
                        ★ {proj.award}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--surface-muted)] mt-0.5 leading-snug">{proj.desc}</p>
                </div>
              </div>
              <time className="text-[13px] text-[var(--surface-muted)] font-medium shrink-0 pt-0.5">
                {proj.year}
              </time>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function WorkSection() {
  const [skylineView, setSkylineView] = useState("2d");
  const skylineRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY.current;

        // If user is at or near top of the page, stay in normal 2D view
        if (currentScrollY <= 40) {
          setSkylineView("2d");
          lastScrollY.current = currentScrollY;
          ticking = false;
          return;
        }

        if (skylineRef.current) {
          const rect = skylineRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Relevant when skyline is entering, inside, or near the viewport
          const isRelevant = rect.top < windowHeight * 0.95 && rect.bottom > 50;

          // Debounce micro-jitter (require at least 4px scroll movement)
          if (Math.abs(diff) >= 4) {
            if (isRelevant) {
              if (diff > 0) {
                // Scrolling down -> open 3D view
                setSkylineView("3d");
              } else {
                // Scrolling up -> fold back to normal 2D view
                setSkylineView("2d");
              }
            } else if (rect.top >= windowHeight * 0.95) {
              // Above the section -> keep normal 2D
              setSkylineView("2d");
            }
          }
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="work-section flex flex-col gap-16 sm:gap-24" aria-labelledby="work-heading">
      {/* GitHub Contribution Skyline — Morphs to 3D when scrolling down, normal 2D when scrolling up */}
      <div ref={skylineRef}>
        <ContributionSkyline
          username="sumitbudaniyaa"
          data={githubData}
          palette="github"
          view={skylineView}
          onViewChange={setSkylineView}
          duration={1100}
        />
      </div>

      <div>
        <div className="section-intro mb-10 sm:mb-12">
          <h2
            id="work-heading"
            className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
          >
            in my first steps as an engineer
          </h2>
        </div>

        <div className="work-list grid gap-16 sm:gap-24">
          {experienceCards
            .filter((card) => card.id !== "muj")
            .map((card) => (
              <CarouselCard key={card.id} card={card} />
            ))}
        </div>
      </div>

      <div>
        <div className="section-intro mb-10 sm:mb-12">
          <h2
            id="education-heading"
            className="text-[26px] sm:text-[32px] font-bold tracking-tight text-[var(--surface-ink)] leading-none"
          >
            education
          </h2>
        </div>

        <div className="education-list grid gap-16 sm:gap-24">
          {experienceCards
            .filter((card) => card.id === "muj")
            .map((card) => (
              <CarouselCard key={card.id} card={card} />
            ))}
        </div>
      </div>
    </section>
  );
}

