const ExpCard = () => {
  return (
    <div className="expcard w-full bg-gradient-to-br from-gray-500/[.074] to-gray-600/[.05] rounded-xl mt-2 flex flex-col p-5 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 group">
      <div className="flex items-center justify-between gap-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center flex-shrink-0 border border-gray-300/20 max-[480px]:w-10 max-[480px]:h-10">
          <img
            src="paddy.png"
            alt="Paddy Digital logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow min-w-0">
          <p className="text-[1.15rem] text-white font-semibold flex items-center gap-2 group-hover:text-blue-400 transition-colors duration-300 max-[480px]:text-base">
            Software Engineer - Intern
          </p>
          <span className="text-[1rem] text-white/60 group-hover:text-white/75 transition-colors duration-300 max-[480px]:text-[.7rem]">
            Paddy Digital Pvt. Ltd.
          </span>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2">
          <p className="text-[.75rem] text-white/50 flex items-center gap-1.5 max-[480px]:text-[.65rem] whitespace-nowrap">
            Nov, 2025 - current
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpCard;
