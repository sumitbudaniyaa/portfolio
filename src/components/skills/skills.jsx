import Skillblock from "./skillblock";

const Skills = () => {
  const skills = [
    "C++",
    "PYTHON",
    "MACHINE LEARNING",
    "DATA SCIENCE",
    "REACT.JS",
    "NEXT.JS",
    "EXPRESS.JS",
    "NODE.JS",
    "SQL",
    "POSTGRESQL",
    "MONGO DB",
    "TAILWINDCSS",
    "SCIKIT-LEARN",
    "PYTORCH",
    "NUMPY",
    "PANDAS",
    "KERAS",
    "JAVA SCRIPT",
    "HTML",
    "CSS",
  ];

  return (
    <div className="skills mt-12 max-[480px]:mt-8">
      <h2 className="text-xl text-white font-[600]">Skills</h2>
      <div className="skill-box flex gap-1 flex-wrap">
        {skills.map((skill) => (
          <Skillblock skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
