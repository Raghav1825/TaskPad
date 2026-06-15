import { ChevronDownIcon , PencilSquareIcon , TrashIcon , InformationCircleIcon} from "@heroicons/react/24/outline";
import { useState,useEffect } from "react";
import api from "../../api/apiClient.js";
import ProjectTaskEditModal from "../Modals/ProjectTaskEditModal.jsx";
import { useDraggable } from "@dnd-kit/core";
function TaskCard({task , onSuccess}){
    const status=["not started","in progress","done"];

    const [rotateStatus,setRotateStatus]=useState(false);
    const [modalStatus,setModalStatus]=useState(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id,
        data: { task },
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.4 : 1,
        zIndex: isDragging ? 50 : "auto",
    };


    const handelTaskModal=(status)=>{
        setModalStatus(status);
    }

    const handleRotateStatus=()=>{
        setRotateStatus((prev)=>(!prev));
    }

    const [editedBy,setEditedBy]=useState("");
    const [addedBy,setAddedBy]=useState("");

    const FindEditedBy=async()=>{
        try{
            const response=await api.get(`/users/${task.editedBy}`);
            setEditedBy(response.data.fullName);
        }catch(error){
            alert(error.message);
        }
    }

    const FindAddedBy=async()=>{
        try{
            const response=await api.get(`/users/${task.addedBy}`);
            setAddedBy(response.data.fullName);
        }catch(error){
            alert(error.message);
        }
    }

    useEffect(()=>{
        FindAddedBy();
        if(task.editedBy){
            FindEditedBy();
        }
    },[task]);

    const handleStatusChange=async(e)=>{
        try{
            await api.patch(`/projectTasks/update-task-status/${task._id}`,{
                taskStatus:e.target.value
            });
            onSuccess();
        }catch(error){
            alert(error.message);
        }
    }

    const handleTaskDelete=async()=>{
        try {
            await api.delete(`/projectTasks/delete-project-task/${task._id}`);
            onSuccess();
        } catch (error) {
            alert(error.message)
        }
    }
    return(
        <div ref={setNodeRef} style={style} className="w-full flex flex-col p-1  bg-primary rounded-md gap-1 cursor-grab active:cursor-grabbing">
            <div className="flex justify-between p-1 items bg-center" {...listeners} {...attributes}>
                <p>{task.taskName}</p>
                <div className="flex items-center gap-2">
                    <ChevronDownIcon className={`w-5 h-5 cursor-pointer ${rotateStatus?"rotate-180":"rotate-0"}`} onClick={handleRotateStatus}/>
                    <div className="relative group">
                        <InformationCircleIcon className="w-5 h-5 cursor-pointer"/>
                        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex flex-col bg-black text-white text-xs rounded-md shadow-lg p-2 whitespace-nowrap z-50">
                            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
                            <p>Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                            <div className="absolute top-full right-2 border-4 border-transparent border-t-surface-variant"></div>
                        </div>
                    </div>
                </div>
            </div>
            {rotateStatus&&
                <div className="w-full p-1 border-t-2 border-on-surface flex flex-col text-xs">
                    <p>Description:</p>
                    <p>{task.taskDescription}</p>
                    <p>Added by: {addedBy}</p>
                    <p>Last Edited by: {task.editedBy?editedBy:"None"}</p>
                </div>
            }
            <div className="flex justify-between items-center p-1 border-t-2 border-on-surface">
                <div className="flex items-center gap-2 mt-1">
                    <p>Status:</p>
                    <select value={task.taskStatus} className="bg-accent rounded-sm cursor-pointer" onChange={handleStatusChange}>
                        <option value={status[0]}>Not Started</option>
                        <option value={status[1]}>In Progress</option>
                        <option value={status[2]}>Done</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5" onClick={()=>handelTaskModal(true)}/>
                    <TrashIcon className="w-5 h-5 hover:text-red-400" onClick={handleTaskDelete}/>
                </div>
            </div>
            <ProjectTaskEditModal isOpen={modalStatus} onClose={()=>handelTaskModal(false)} taskData={task} onSuccess={onSuccess}/>
        </div>
    )
}
export default TaskCard