import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
function ProjectModal({isOpen,onClose}){
    if(!isOpen) return null;
    const [projectName,setProjectName]=useState("");
    const [projectDescription,setProjectDescription]=useState("");
    const [projectData,setProjectData]=useState([]);
    const handleProjectName=(e)=>{
        setProjectName(e.target.value);
    }
    const handleProjectDescription=(e)=>{
        setProjectDescription(e.target.value);
    }
    const addMessage=()=>{
        if(projectName.trim()!==""){

            const newProject={
                projectName:projectName,
                projectDescription:projectDescription,
            };
            setProjectData((prev)=>[...prev,newProject]);
            setProjectName("");
            setProjectDescription("");
            alert(`Project "${projectName}" added successfully.`);
            onClose();
        } 
        else alert("Please enter a project name");
    }
    return(
        <>  
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:w-xl md:w-lg">
                <div className="w-full flex justify-between items-center">
                    <p>Add details...</p>
                    <XMarkIcon className="w-7 h-7 cursor-pointer hover:text-red-400" onClick={onClose} />
                </div>

                <input type="text" placeholder="Add project name" className="border h-11 p-3 rounded-lg" onChange={handleProjectName}/>
                <textarea placeholder="Add description for the project" className="border p-3 rounded-lg" onChange={handleProjectDescription}/>
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={addMessage} >Add Project</button>
            </div>
        </>
    );
}

export default ProjectModal