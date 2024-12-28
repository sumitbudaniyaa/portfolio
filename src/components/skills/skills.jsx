import Skillblock from "./skillblock";
import "./skills.css";

const Skills = () => {
  const skills = [
    "HTML",
    "CSS",
    "JAVA SCRIPT",
    "REACT.JS",
    "EXPRESS.JS",
    "MONGO DB",
    "NODE.JS",
    "C",
    "JAVA",
    "BOOTSTRAP",
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
