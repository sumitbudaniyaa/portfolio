import ProjCard from '../projcard/projcard';
import './myproj.css'
import projdata from '../../projdata';


const MyProj = () =>{
    return(
        <div className="myproj">
            <h2>My Projects</h2>
            <p>Some of my projects are listed below</p>


            <div className="projbox">
                {projdata.map((proj)=>(
                     <ProjCard title = {proj.title} desc={proj.desc} logo={proj.logo} web={proj.web}/>
                ))}
            </div>
        </div>
    )
}

export default MyProj;