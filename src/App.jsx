import "./App.css";
import About from "./components/about/about";
import Edu from "./components/education/edu";
import Exp from "./components/experience/experience";
import MyProj from "./components/myproj/myproj";
import Nav from "./components/nav/nav";
import Skills from "./components/skills/skills";

function App() {
  return (
    <>
      <div className="screen">
        <About />
        <Exp />
        <Edu />
        <Skills />
        <MyProj />
      </div>
      <Nav />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#808080"
          fill-opacity="50%"
          d="M0,32L20,53.3C40,75,80,117,120,112C160,107,200,53,240,48C280,43,320,85,360,128C400,171,440,213,480,229.3C520,245,560,235,600,202.7C640,171,680,117,720,80C760,43,800,21,840,48C880,75,920,149,960,165.3C1000,181,1040,139,1080,138.7C1120,139,1160,181,1200,192C1240,203,1280,181,1320,144C1360,107,1400,53,1420,26.7L1440,0L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"
        ></path>
      </svg>
    </>
  );
}

export default App;
