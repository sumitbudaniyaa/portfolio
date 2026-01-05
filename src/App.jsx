import About from "./components/about/about";
import Edu from "./components/education/edu";
import Exp from "./components/experience/experience";
import MyProj from "./components/myproj/myproj";
import Nav from "./components/nav/nav";
import Skills from "./components/skills/skills";

function App() {
  return (
    <>
      <div className="w-screen md:w-[50%] px-3 pt-10 pb-25 lg:w-[35%] ml-[50%] translate-x-[-50%]">
        <About />
        <Exp />
        <Edu />
        <Skills />
        <MyProj />
      </div>
      <Nav />
    </>
  );
}

export default App;
