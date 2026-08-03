import About from "./components/about/about";
import Achievements from "./components/achievements/achievements";
import Exp from "./components/experience/experience";
import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import Marquee from "./components/ui/marquee";
import MyProj from "./components/myproj/myproj";
import Nav from "./components/nav/nav";
import ProfileCard from "./components/profile/profilecard";
import Skills from "./components/skills/skills";

function App() {
  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <Nav />

      {/*
        Below `lg` this is an ordinary page: card on top, body scrolls.
        From `lg` up the shell is locked to the viewport and the content
        column becomes the scroll container, so the panel never moves.
      */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:h-screen lg:flex-row lg:gap-14 lg:overflow-hidden lg:pb-0 lg:pt-0">
        {/* Pinned identity panel */}
        <aside className="no-scrollbar lg:h-full lg:w-88 lg:shrink-0 lg:overflow-y-auto lg:pb-8 lg:pt-28 xl:w-96">
          <ProfileCard />
        </aside>

        {/* The only thing that scrolls on desktop */}
        <main className="no-scrollbar min-w-0 lg:h-full lg:flex-1 lg:overflow-y-auto lg:scroll-smooth lg:pb-20 lg:pt-28">
          <Hero />
          <div className="mt-14">
            <Marquee />
          </div>
          <About />
          <Exp />
          <Skills />
          <Achievements />
          <MyProj />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
