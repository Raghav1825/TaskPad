import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import EditProjectModal from "../Modals/EditProjectModal";
import api from "../../api/apiClient";
function ProjectCard({projectData,index,onOpenProject,onSuccess}){
    const typesOfStatus=["Not Started","In Progress","Done"];

    const getStatusStyle=(status)=>{
        if(status === "Not Started"){
            return null;
        }
        else if(status === "In Progress"){
            return "border-t-4 border-blue-500";
        }
        else if(status === "Done"){
            return "border-t-4 border-green-500";
        }
    }

    const [openEdit,setOpenEdit]=useState(false);

    const handleEdit=(status)=>{
        setOpenEdit(status);
    }

    const handleStatusChange=async(e)=>{
        const newStatus=e.target.value;
        try{
            await api.patch(`/projects/edit-project-status/${projectData._id}`,{projectStatus:newStatus});
            onSuccess();
        }
        catch(error){
            alert(error.message);
        }
    }
    return(
        <>
            <div onClick={onOpenProject} className={`shadow-md shadow-primary rounded-2xl w-full md:w-56 lg:w-xs h-48 lg:h-52 flex flex-col hover:scale-105 duration-200 ease-in-out gap-2 ${getStatusStyle(projectData.projectStatus)}`}>
                <div className="w-full h-12 p-2 text-xl">
                    <p>{projectData.projectName}</p>
                </div>
                <div className="w-full h-24 p-2 overflow-hidden">
                    <p className="underline underline-offset-4 decoration-dashed">Description</p>
                    <p className="text-sm text-on-surface/50">{projectData.projectDescription}</p>
                </div>
                <div className="p-2 w-full flex justify-between" onClick={(e) => e.stopPropagation()}>
                    <div className="text-sm md:text-md flex items-center gap-1">
                        <label>Status: </label>
                        <select className="bg-primary rounded-lg cursor-pointer"  value={projectData.projectStatus} onChange={handleStatusChange}>
                            {typesOfStatus.map((Status,index)=><option value={Status} key={index}>{Status}</option>)}
                        </select>
                    </div>
                    <button>
                        <PencilIcon className="w-5 h-5 cursor-pointer mr-1" onClick={()=>handleEdit(true)}/>
                    </button>
                </div>
            </div>

            <EditProjectModal 
                        isOpen={openEdit} 
                        projectData={projectData} 
                        onClose={()=>handleEdit(false)}   
                        onSuccess={onSuccess}
            />
        </>
    )
}
export default ProjectCard