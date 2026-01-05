import ProjCard from '../projcard/projcard';
import projdata from '../../projdata';


const MyProj = () =>{
    return(
        <div className="myproj mt-12 max-[480px]:mt-8">
            <h2 className="text-xl text-white font-semibold">My Projects</h2>
            <p className="text-gray-500 font-normal max-[480px]:text-[.9rem]">Some of my projects are listed below</p>


            <div className="projbox w-full flex flex-col">
                {projdata.map((proj)=>(
                     <ProjCard title = {proj.title} desc={proj.desc} logo={proj.logo} web={proj.web}/>
                ))}
            </div>
        </div>
    )
}

export default MyProj;