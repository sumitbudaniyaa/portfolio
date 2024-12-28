import "./nav.css";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

const Nav = () => {
  return (
    <div className="nav">
      <a href="mailto:sumit.k.budaniya@gmail.com" target="_blank"><IoMail className="icons"/></a>
      <a href="https://www.linkedin.com/in/sumit-kumar-931a06343/" target="_blank"><FaLinkedin className="icons" /></a>
      <a href="https://github.com/sumitbudaniyaa" target="_blank"><FaSquareGithub className="icons" /></a>
    </div>
  );
};

export default Nav;
