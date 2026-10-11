import { useEffect } from "react";

/**
 * Inertial smooth scrolling (Lenis-style exponential damping) for wheel and
 * keyboard navigation while respecting reduced-motion preferences and native
 * touch scrolling.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId = 0;
    let lastTime = 0;
    let isAnimating = false;

    const getMaxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const clamp = (val) => Math.max(0, Math.min(val, getMaxScroll()));

    const tick = (now) => {
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;

      // Exponential smoothing factor (~60fps/120fps frame-rate independent)
      const factor = 1 - Math.exp(-11 * dt);
      const diff = targetY - currentY;

      if (Math.abs(diff) > 0.35) {
        currentY += diff * factor;
        window.scrollTo({ top: currentY, behavior: "instant" });
        rafId = requestAnimationFrame(tick);
      } else {
        currentY = targetY;
        window.scrollTo({ top: targetY, behavior: "instant" });
        isAnimating = false;
        lastTime = 0;
      }
    };

    const startLoop = () => {
      if (!isAnimating) {
        isAnimating = true;
        lastTime = 0;
        rafId = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e) => {
      // Allow pinch-to-zoom or horizontal-dominant gestures to pass through
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      // Normalize deltaMode (0 = pixels, 1 = lines, 2 = pages)
      const multiplier =
        e.deltaMode === 1 ? 36 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = e.deltaY * multiplier;

      const maxScroll = getMaxScroll();
      if (
        (targetY <= 0 && delta < 0) ||
        (targetY >= maxScroll && delta > 0)
      ) {
        return;
      }

      e.preventDefault();
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
      targetY = clamp(targetY + delta);
      startLoop();
    };

    const onScroll = () => {
      // Keep state synced when user drags scrollbar or jumps via anchor
      if (!isAnimating) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }
    };

    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      let step = 0;
      if (e.key === "ArrowDown") step = 110;
      else if (e.key === "ArrowUp") step = -110;
      else if (e.key === "PageDown" || (e.key === " " && !e.shiftKey))
        step = window.innerHeight * 0.8;
      else if (e.key === "PageUp" || (e.key === " " && e.shiftKey))
        step = -window.innerHeight * 0.8;
      else if (e.key === "Home") {
        e.preventDefault();
        if (!isAnimating) currentY = window.scrollY;
        targetY = 0;
        startLoop();
        return;
      } else if (e.key === "End") {
        e.preventDefault();
        if (!isAnimating) currentY = window.scrollY;
        targetY = getMaxScroll();
        startLoop();
        return;
      }

      if (step !== 0) {
        e.preventDefault();
        if (!isAnimating) {
          currentY = window.scrollY;
          targetY = window.scrollY;
        }
        targetY = clamp(targetY + step);
        startLoop();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);
}

