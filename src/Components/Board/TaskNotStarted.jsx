import TaskCard from "./TaskCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import TaskModal from "../Modals/TaskModal";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
function TaskNotStarted({tasks, projectID,onSuccess}){
    let n=tasks.length;
    let empty=n>0?false:true;
    const [modalStatus,setModalStatus]=useState(false);

    const { isOver, setNodeRef } = useDroppable({
        id: "not started", 
    });

    const handelProjectModal=(status)=>{
        setModalStatus(status);
    }

    return(
        <div ref={setNodeRef} className={`w-full md:w-1/3 rounded-xl border border-gray-400 shadow-lg shadow-gray-400 mb-4 p-2 ${
                isOver
                    ? "border-gray-300 bg-gray-400/10 scale-[1.02] shadow-xl shadow-gray-300"
                    : "border-gray-400 shadow-gray-400"
            }`}>
            <div className="w-full flex p-1 items-center justify-between border-b-2 border-gray-400 mb-1">
                <p>Not Started</p>
                <PlusIcon className="w-6 h-6 cursor-pointer" onClick={()=>handelProjectModal(true)}/>
            </div>
            <TaskModal isOpen={modalStatus} onClose={()=>handelProjectModal(false)} projectID={projectID} onSuccess={onSuccess}/>
            <div className="flex flex-col gap-2">
                {empty &&
                    <div className="w-full h-28 flex justify-center items-center">
                        <p>Empty Task list</p>
                    </div>
                }
                {!empty&&
                    tasks.map((task)=>(<TaskCard task={task} onSuccess={onSuccess} key={task._id}/>))
                }
            </div>
        </div>
    )
}
export default TaskNotStarted