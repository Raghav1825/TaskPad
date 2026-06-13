import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState,useEffect } from "react";
import api from "../../api/apiClient";

function EditProjectModal({isOpen,onClose,projectData}){
    const [newName,setNewName]=useState("");
    const [newDescription,setNewDescription]=useState("");

    useEffect(() => {
        if (projectData) {
            setNewName(projectData.projectName);
            setNewDescription(projectData.projectDescription);
        }
    }, [projectData]);

    if(!isOpen) return null;

    const handleNameChange=(e)=>{
        setNewName(e.target.value);
    }

    const handleDescriptionChange=(e)=>{
        setNewDescription(e.target.value);
    }

    const handleProjectEdit=async()=>{
        const updatedProject = {
            projectName: newName,
            projectDescription: newDescription,
        };
        try {
            await api.patch(`/projects/edit-project-details/${projectData._id}`, updatedProject);
            window.location.reload();
            onClose();
        } catch (error) {
            console.log(error);
            onClose();
        }
    }


    return(
        <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:w-xl md:w-lg">
                <div className="w-full flex justify-between items-center">
                    <p>Change details...</p>
                    <XMarkIcon className="w-7 h-7 cursor-pointer hover:text-red-400" onClick={onClose} />
                </div>
                <p className="text-on-surface/50 italic">Project Name</p>
                <input type="text" value={newName} className="border h-11 p-3 rounded-lg" onChange={handleNameChange}/>
                <p className="text-on-surface/50 italic">Description</p>
                <textarea value={newDescription} className="border p-3 rounded-lg" onChange={handleDescriptionChange}/>
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={handleProjectEdit}>Save Changes</button>
            </div>
        </>
    )
}

export default EditProjectModal
