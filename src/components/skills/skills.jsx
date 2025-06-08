import Skillblock from "./skillblock";
import "./skills.css";

const Skills = () => {
  const skills = [
    "C++",
    "PYTHON",
    "ML",
    "DATA SCIENCE",
    "REACT.JS",
    "EXPRESS.JS",
    "NODE.JS",
    "MONGO DB",
    "JAVA SCRIPT",
    "HTML",
    "CSS",
  ];

  return (
    <div className="skills">
      <h2>Skills</h2>
      <div className="skill-box">
        {skills.map((skill) => (
          <Skillblock skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
