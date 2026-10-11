import { useState } from "react";
import SkyAtmosphere from "./components/sky/SkyAtmosphere";
import HeroIntro from "./components/hero/HeroIntro";
import WorkSection from "./components/work/WorkSection";
import SideProjectsSection from "./components/projects/SideProjectsSection";
import ToolDockDemo from "./components/ui/demo";
import ClosingSection from "./components/closing/ClosingSection";
import ClearwaterWater from "./components/closing/ClearwaterWater";
import useSmoothScroll from "./hooks/useSmoothScroll";

function getLiveHour() {
  const d = new Date();
  return d.getHours() + d.getMinutes() / 60;
}

function App() {
  useSmoothScroll();

  const [timeOfDay, setTimeOfDay] = useState(getLiveHour);
  const [weatherData, setWeatherData] = useState({
    cloudCover: 25,
    windSpeed: 10,
    rain: 0,
    weatherCode: 0,
    temperature: 34,
  });

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden selection:bg-emerald-500 selection:text-white text-[var(--surface-ink)] transition-colors duration-500">
      {/* Sky Atmosphere Canvas & Morphing Weather / Arc Time Dial */}
      <SkyAtmosphere
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        weatherData={weatherData}
        setWeatherData={setWeatherData}
      />

      {/* Main Stage with generous sky breathing room */}
      <main className="relative z-10 w-full pt-[clamp(340px,46svh,520px)] pb-12">
        <div className="site-grid">
          <div className="flex flex-col gap-16 sm:gap-24">
            {/* Clean Editorial Hero Intro & Bio */}
            <HeroIntro />

            {/* Featured Work & Education */}
            <WorkSection />

            {/* Side Projects */}
            <SideProjectsSection />

            {/* Interactive Tech Stack Dock */}
            <ToolDockDemo />

            {/* Closing Animated Signature */}
            <ClosingSection />
          </div>
        </div>
      </main>

      {/* Clearwater WebGL2 Photoreal Shallow Water Footer - Edge-to-Edge Full Width */}
      <footer className="w-full relative overflow-hidden" aria-label="Clearwater shallow water footer">
        <ClearwaterWater timeOfDay={timeOfDay} weatherData={weatherData} />
      </footer>
    </div>
  );
}

export default App;
