import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FileText } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="fixed left-0 right-0 bottom-4 z-50 max-[480px]:bottom-3 flex justify-center">
      <div className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)] border border-gray-700/50 px-4 py-2.5 flex items-center gap-2 max-[480px]:px-2.5 max-[480px]:gap-1.5 max-[480px]:py-2">
        <a
          href="mailto:sumit.k.budaniya@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-blue-500/20 transition-all duration-300 active:scale-90 group/icon max-[480px]:p-1.5"
          aria-label="Email"
        >
          <IoMail className="text-xl text-gray-300 group-hover/icon:text-blue-400 transition-colors duration-300 max-[480px]:text-lg" />
        </a>

        <a
          href="https://www.linkedin.com/in/sumit-kumar-931a06343/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-blue-600/20 transition-all duration-300 active:scale-90 group/icon max-[480px]:p-1.5"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="text-xl text-gray-300 group-hover/icon:text-blue-500 transition-colors duration-300 max-[480px]:text-lg" />
        </a>

        <a
          href="https://github.com/sumitbudaniyaa"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-purple-500/20 transition-all duration-300 active:scale-90 group/icon max-[480px]:p-1.5"
          aria-label="GitHub"
        >
          <FaSquareGithub className="text-xl text-gray-300 group-hover/icon:text-purple-400 transition-colors duration-300 max-[480px]:text-lg" />
        </a>

        <div className="w-px h-6 bg-gray-600/50 mx-1.5 max-[480px]:h-5 max-[480px]:mx-1"></div>

        <a
          href="https://drive.google.com/file/d/1TIKyRvnOcbprU_CiKzT31lzDQ3YuqUpO/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="font-semibold text-sm text-white flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 active:scale-95 outline-none max-[480px]:text-xs max-[480px]:px-3 max-[480px]:py-1.5">
            Resume
            <FileText size={14} className="max-[480px]:hidden" />
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Nav;
