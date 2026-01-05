const About = () => {
  return (
    <div className="about">
      <div className="name-photo mt-12 max-[480px]:-mt-4 max-[768px]:mt-4">
        <h1 className="text-white text-[3.25rem] font-[600] -mt-4 max-[480px]:text-[2rem] max-[480px]:pr-[50%] min-[481px]:max-[768px]:text-[2.5rem] min-[481px]:max-[768px]:pr-[45%]">
          Hi, I'm Sumit👋
        </h1>
        <p className="text-white text-[1.5rem] font-[400] -mt-4 max-[480px]:text-base max-[480px]:-mt-1 min-[481px]:max-[768px]:text-lg min-[481px]:max-[768px]:-mt-2">
          Software & AI/ML Engineer
        </p>
        <img
          src="sumitpix.jpg"
          alt="Sumit's profile"
          className="w-36 h-36 rounded-full float-right mr-8 -mt-28 max-[480px]:absolute max-[480px]:top-[3.25rem] max-[480px]:left-[75%] max-[480px]:-translate-x-1/2 max-[480px]:w-[5.5rem] max-[480px]:h-[5.5rem] max-[480px]:mt-0 max-[480px]:shadow-[0px_0px_150px_10px_rgba(98,130,188,0.789)] min-[481px]:max-[768px]:absolute min-[481px]:max-[768px]:top-[2.5rem] min-[481px]:max-[768px]:left-[78%] min-[481px]:max-[768px]:-translate-x-1/2 min-[481px]:max-[768px]:w-[7rem] min-[481px]:max-[768px]:h-[7rem] min-[481px]:max-[768px]:mt-0 min-[481px]:max-[768px]:shadow-[0px_0px_150px_10px_rgba(98,130,188,0.789)]"
        />
      </div>

      <div className="desc mt-20 max-[480px]:mt-8 min-[481px]:max-[768px]:mt-12">
        <h2 className="text-xl text-white font-[600]">About</h2>
        <p className="text-gray-500 font-[500] text-[.91rem]">
          I'm Sumit, a <span className="text-white underline decoration-wavy">3rd-year B.Tech CSE (Data Science)</span> student at <span className="text-white underline decoration-wavy">Manipal University Jaipur</span> with strong hands-on experience in <span className="text-white underline decoration-wavy">Full-stack development</span> & <span className="text-white underline decoration-wavy">AI/ML engineering</span>. I enjoy building products end-to-end, with a deep focus on real users, real workflows, and real-world constraints. I approach problems with a product-first and entrepreneurial mindset observing inefficiencies, validating whether a solution truly helps, and then building around that. I value ownership, learn quickly, and aim to contribute wherever I can add meaningful value.
        </p>
      </div>
    </div>
  );
};

export default About;
