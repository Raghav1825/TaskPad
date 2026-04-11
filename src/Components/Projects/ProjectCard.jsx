import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
function ProjectCard({projectData}){
    const [status,setStatus]=useState("");
    const typesOfStatus=["Not Started","In Progress","Done"];
    return(
        <div className="shadow-md shadow-primary rounded-2xl  w-48 lg:w-xs h-48 lg:h-52 flex flex-col hover:scale-105 duration-200 ease-in-out gap-2">
            <div className="w-full h-12 p-2 text-xl">
                <p>{projectData.projectName}</p>
            </div>
            <div className="w-full h-24 p-2 overflow-hidden">
                <p className="underline underline-offset-4 decoration-dashed">Description</p>
                <p className="text-sm text-on-surface/50">{projectData.projectDescription}</p>
            </div>
            <div className="p-2 w-full flex justify-between">
                <div className="text-sm md:text-md flex items-center gap-1">
                    <label>Status: </label>
                    <select className="bg-primary rounded-lg cursor-pointer">
                        {typesOfStatus.map((Status,index)=><option value={Status} key={index}>{Status}</option>)}
                    </select>
                </div>
                <button>
                    <PencilIcon className="w-5 h-5 cursor-pointer mr-1"/>
                </button>
            </div>
        </div>
    )
}
export default ProjectCard