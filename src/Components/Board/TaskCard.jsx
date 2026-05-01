import { ChevronDownIcon , PencilSquareIcon , TrashIcon , InformationCircleIcon} from "@heroicons/react/24/outline";
import { useState } from "react";
function TaskCard({task}){
    const status=["not started","in progress","done"];

    const [rotateStatus,setRotateStatus]=useState(false);

    const handleRotateStatus=()=>{
        setRotateStatus((prev)=>(!prev));
    }
    return(
        <div className="w-full flex flex-col p-1  bg-primary rounded-md gap-1">
            <div className="flex justify-between p-1 items bg-center">
                <p>{task.taskName}</p>
                <div className="flex items-center gap-2">
                    <ChevronDownIcon className={`w-5 h-5 cursor-pointer ${rotateStatus?"rotate-180":"rotate-0"}`} onClick={handleRotateStatus}/>
                    <InformationCircleIcon className="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            {rotateStatus&&
                <div className="w-full p-1 border-t-2 border-on-surface flex flex-col text-xs">
                    <p>Description:</p>
                    <p>{task.taskDescription}</p>
                    <p>Added by: {task.addedBy}</p>
                    <p>Last Edited by: {task.editedBy?task.editedBy:"None"}</p>
                </div>
            }
            <div className="flex justify-between items-center p-1 border-t-2 border-on-surface">
                <div className="flex items-center gap-2 mt-1">
                    <p>Status:</p>
                    <select value={task.taskStatus} className="bg-accent rounded-sm cursor-pointer">
                        <option value={status[0]}>Not Started</option>
                        <option value={status[1]}>In Progress</option>
                        <option value={status[2]}>Done</option>
                    </select>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5"/>
                    <TrashIcon className="w-5 h-5 hover:text-red-400"/>
                </div>
            </div>
        </div>
    )
}
export default TaskCard