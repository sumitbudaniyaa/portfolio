import { MdKeyboardArrowRight } from "react-icons/md";

const Edu = () => {
  return (
    <div className="edu mt-12 max-[480px]:mt-8">
      <h2 className="text-xl text-white font-semibold mb-3">Education</h2>
      <a
        href="https://jaipur.manipal.edu/"
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline block"
      >
        <div className="educard w-full min-h-16 bg-gradient-to-br from-gray-500/[.074] to-gray-600/[.05] rounded-xl mt-2 flex items-center px-5 py-4 group hover:cursor-pointer transition-all duration-300 border border-gray-700/30 hover:border-gray-600/50 hover:shadow-lg hover:shadow-gray-900/20 max-[480px]:min-h-32 max-[480px]:px-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/95 flex items-center justify-center flex-shrink-0 border border-gray-300/20 max-[480px]:w-10 max-[480px]:h-10">
            <img
              src="mujlogo.jpg"
              alt="Manipal University Jaipur logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="clg-desc h-full flex flex-col justify-center px-4 flex-grow min-w-0">
            <p className="text-white font-semibold text-[1.15rem] flex items-center gap-1 group-hover:text-blue-400 transition-colors duration-300 max-[480px]:text-[.9rem]">
              Manipal University Jaipur
              <MdKeyboardArrowRight className="arrow-icon text-2xl opacity-0 -ml-1 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1" />
            </p>
            <span className="text-white/60 font-normal text-[.8rem] leading-relaxed group-hover:text-white/75 transition-colors duration-300 max-[480px]:text-[.65rem]">
              Bachelor's of Technology in Computer Science and Engineering (DATA SCIENCE)
            </span>
          </div>

          <div className="ml-auto flex-shrink-0">
            <p className="text-white/50 font-light italic text-[.85rem] max-[480px]:text-[.65rem]">
              pursuing
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Edu;