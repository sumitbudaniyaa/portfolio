import './expcard.css'
import { FaGlobe } from "react-icons/fa";


const ExpCard = () =>
{
    return(
         <div className="expcard">
                <FaGlobe className='expicon'/>
                <p>Freelance  <span>🟢Active</span></p>
         </div>
    )
}

export default ExpCard;