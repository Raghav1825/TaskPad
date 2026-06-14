import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import api from "../../api/apiClient.js";
function DailyTaskModal({isOpen,onClose,onSuccess}){
    if(!isOpen) return null;
    const [task,setTask]=useState("");
    const [taskDescription,setTaskDescription]=useState("");

    const handletask=(e)=>{
        setTask(e.target.value);
    }
    const handleTaskDescription=(e)=>{
        setTaskDescription(e.target.value);
    }
    const addTask = async() => {
        try {
            await api.post("/dailyTasks/add-task",{name:task,description:taskDescription});
            await onSuccess();
            onClose();
        } catch (error) {
            alert(error.message);
            onClose();
        }
    };
    return(
        <>  
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:w-xl md:w-lg">
                <div className="w-full flex justify-between items-center">
                    <p>Add details...</p>
                    <XMarkIcon className="w-7 h-7 cursor-pointer hover:text-red-400" onClick={onClose} />
                </div>

                <input type="text" placeholder="Add task" className="border h-11 p-3 rounded-lg" onChange={handletask}/>
                <textarea placeholder="Add description for the task" className="border p-3 rounded-lg" onChange={handleTaskDescription}/>
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={addTask} >Add Task</button>
            </div>
        </>
    );
}

export default DailyTaskModal