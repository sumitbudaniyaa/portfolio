import "./about.css";

const About = () => {
  return (
    <div className="about">
      <div className="name-photo">
        <h1>Hi, I'm Sumit👋</h1>
        <p>Fullstack Developer</p>
        <img src="sumitpix.jpg" alt="" />
      </div>

      <div className="desc">
        <h2>About</h2>
        <p>
          I am a student currently pursuing a  <span>B.Tech in CSE (Data Science)</span> from
          <span> Manipal University Jaipur</span>. I have a strong foundation in <span>MERN
          Stack</span>. I am eager to apply my skills in
          web design and development, gain hands-on experience, and contribute
          to innovative projects.
        </p>
      </div>
    </div>
  );
};

export default About;
