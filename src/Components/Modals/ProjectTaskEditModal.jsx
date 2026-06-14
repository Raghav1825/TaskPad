import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState,useEffect } from "react";
import api from "../../api/apiClient";

function ProjectTaskEditModal({isOpen,onClose,taskData,onSuccess}){
    if(!isOpen) return null;

    const [taskName,setTaskName]=useState("");
    const [taskDescription,setTaskDescription]=useState("");

    useEffect(()=>{
        if(taskData){
            setTaskName(taskData.taskName);
            setTaskDescription(taskData.taskDescription);
        }
    },[taskData])

    const handleNameChange=(e)=>{
        setTaskName(e.target.value);
    }

    const handleDescriptionChange=(e)=>{
        setTaskDescription(e.target.value);
    }

    const handleTaskEdit=async()=>{
        try{
            await api.patch(`/projectTasks/edit-project-task/${taskData._id}`,{
                taskName,
                taskDescription
            });
            onSuccess();
            onClose();
        }catch(error){
            alert(error.message);
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
                <p className="text-on-surface/50 italic">Task Name:</p>
                <input type="text" value={taskName} className="border h-11 p-3 rounded-lg" onChange={handleNameChange}/>
                <p className="text-on-surface/50 italic">Task Description:</p>
                <textarea value={taskDescription} className="border p-3 rounded-lg" onChange={handleDescriptionChange}/>
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={handleTaskEdit}>Save Changes</button>
            </div>
        </>
    )
}

export default ProjectTaskEditModal
