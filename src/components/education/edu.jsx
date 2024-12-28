import './edu.css'
import { MdKeyboardArrowRight } from "react-icons/md";

const Edu = () =>{
    return(
<div className="edu">
    <h2>Education</h2>
    <a href="https://jaipur.manipal.edu/" target='_blank'><div className="educard">
        <img src="mujlogo.jpg" alt="" />
        <div className="clg-desc">
            <p>Manipal University Jaipur <MdKeyboardArrowRight className='arrow-icon'/></p>
            <span>Bachelor's of Technology in Computer Science and Engineering (DATA SCIENCE)</span>
        </div>
        <p>pursuing</p>
    </div></a>
</div>

    )
}

export default Edu;