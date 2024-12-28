import './App.css'
import About from './components/about/about'
import Edu from './components/education/edu'
import Exp from './components/experience/experience'
import MyProj from './components/myproj/myproj'
import Nav from './components/nav/nav'
import Skills from './components/skills/skills'

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
         </>
  )
}

export default App
