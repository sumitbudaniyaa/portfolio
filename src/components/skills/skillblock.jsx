const Skillblock = ({ skill }) => {
  // Skill to color mapping
  const skillStyles = {
    "C++": { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/40", text: "text-blue-400" },
    "PYTHON": { bg: "from-yellow-500/20 to-blue-500/10", border: "border-yellow-500/40", text: "text-yellow-400" },
    "MACHINE LEARNING": { bg: "from-purple-500/20 to-pink-500/10", border: "border-purple-500/40", text: "text-purple-400" },
    "DATA SCIENCE": { bg: "from-orange-500/20 to-red-500/10", border: "border-orange-500/40", text: "text-orange-400" },
    "REACT.JS": { bg: "from-cyan-500/20 to-blue-500/10", border: "border-cyan-500/40", text: "text-cyan-400" },
    "NEXT.JS": { bg: "from-gray-500/20 to-gray-600/10", border: "border-gray-500/40", text: "text-gray-300" },
    "EXPRESS.JS": { bg: "from-green-500/20 to-emerald-500/10", border: "border-green-500/40", text: "text-green-400" },
    "NODE.JS": { bg: "from-green-600/20 to-green-700/10", border: "border-green-600/40", text: "text-green-400" },
    "SQL": { bg: "from-blue-600/20 to-indigo-600/10", border: "border-blue-600/40", text: "text-blue-400" },
    "POSTGRESQL": { bg: "from-blue-700/20 to-blue-800/10", border: "border-blue-700/40", text: "text-blue-400" },
    "MONGO DB": { bg: "from-green-700/20 to-green-800/10", border: "border-green-700/40", text: "text-green-400" },
    "TAILWINDCSS": { bg: "from-cyan-400/20 to-blue-400/10", border: "border-cyan-400/40", text: "text-cyan-400" },
    "SCIKIT-LEARN": { bg: "from-orange-600/20 to-amber-600/10", border: "border-orange-600/40", text: "text-orange-400" },
    "PYTORCH": { bg: "from-red-600/20 to-orange-600/10", border: "border-red-600/40", text: "text-red-400" },
    "NUMPY": { bg: "from-blue-400/20 to-indigo-500/10", border: "border-blue-400/40", text: "text-blue-300" },
    "PANDAS": { bg: "from-purple-600/20 to-indigo-600/10", border: "border-purple-600/40", text: "text-purple-400" },
    "KERAS": { bg: "from-red-500/20 to-red-600/10", border: "border-red-500/40", text: "text-red-400" },
    "JAVA SCRIPT": { bg: "from-yellow-400/20 to-yellow-500/10", border: "border-yellow-400/40", text: "text-yellow-400" },
    "HTML": { bg: "from-orange-500/20 to-red-500/10", border: "border-orange-500/40", text: "text-orange-400" },
    "CSS": { bg: "from-blue-500/20 to-indigo-500/10", border: "border-blue-500/40", text: "text-blue-400" },
  };

  const style = skillStyles[skill] || {
    bg: "from-gray-500/20 to-gray-600/10",
    border: "border-gray-500/40",
    text: "text-gray-400"
  };

  return (
    <div
      className={`group h-auto bg-gradient-to-br ${style.bg} rounded-md mt-2 inline-flex items-center justify-center font-medium text-[.65rem] px-2 py-1 border-2 border-dashed ${style.border} hover:border-solid hover:shadow-lg transition-all duration-300 cursor-default max-[480px]:text-[.6rem] max-[480px]:px-1.5`}
    >
      <p className={`${style.text} transition-colors duration-300`}>
        {skill}
      </p>
    </div>
  );
};

export default Skillblock;