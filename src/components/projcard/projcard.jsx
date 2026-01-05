import { MdKeyboardArrowRight } from "react-icons/md";
import {Star} from 'lucide-react';

const ProjCard = ({title, desc, logo, web, star}) => {
  return (
    <div className="projcard relative w-full h-auto bg-gradient-to-br from-gray-500/[.074] to-gray-600/[.05] rounded-2xl p-5 mt-4 flex items-center border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 group">
      {star && (
        <div className="absolute right-3 top-3 flex items-center gap-1.5 bg-yellow-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-500/40 max-[480px]:right-2 max-[480px]:top-2">
          <Star
            size={'0.9rem'}
            fill="currentColor"
            className="text-yellow-500 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]"
          />
          <span className="text-yellow-500 text-[0.7rem] font-semibold uppercase tracking-wider max-[480px]:text-[0.6rem]">
            Star
          </span>
        </div>
      )}

      {logo ? (
        <div className="w-[22%] h-full min-h-[100px] rounded-lg overflow-hidden bg-gray-800/50 flex items-center justify-center max-[480px]:w-[20%] max-[480px]:min-h-[80px] border border-gray-700/30 group-hover:border-gray-600/50 transition-all duration-300">
          <img
            src={logo}
            alt={`${title} logo`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="w-[22%] h-full min-h-[100px] rounded-lg bg-gradient-to-br from-gray-700/40 to-gray-800/40 flex items-center justify-center max-[480px]:w-[20%] max-[480px]:min-h-[80px] border border-gray-700/50">
          <span className="text-4xl max-[480px]:text-2xl">📁</span>
        </div>
      )}

      <div className="projdesc w-[78%] h-full pl-5 flex flex-col justify-between gap-2 max-[480px]:w-[80%] max-[480px]:pl-3">
        <div>
          <h2 className="text-2xl text-white font-semibold mb-2 max-[480px]:text-base group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </h2>
          <p className="text-base font-normal text-white/60 leading-relaxed max-[480px]:text-[.7rem] group-hover:text-white/75 transition-colors duration-300">
            {desc}
          </p>
        </div>

        {web && (
          <a
            href={web}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 self-end mt-2 font-light flex no-underline items-center gap-1 text-[.9rem] cursor-pointer hover:text-blue-400 transition-all duration-300 max-[480px]:text-[.6rem] group/link"
          >
            <span className="border-b border-transparent group-hover/link:border-blue-400 transition-all duration-300">
              Visit Website
            </span>
            <MdKeyboardArrowRight
              id="right-arrow-icon"
              className="text-lg transition-transform duration-300 group-hover/link:translate-x-1"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjCard;
