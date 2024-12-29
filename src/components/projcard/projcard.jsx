import "./projcard.css";
import { MdKeyboardArrowRight } from "react-icons/md";


const ProjCard = ({title, desc,logo,web}) => {

 

  return (
    <div className="projcard">
      <img src={logo} alt="" />
      <div className="projdesc">
        <h2>{title}</h2>
        <p>
          {desc}
        </p>

        <a href={web} target="_blank">website<MdKeyboardArrowRight id="right-arrow-icon"/></a>
      </div>
    </div>
  );
};

export default ProjCard;
