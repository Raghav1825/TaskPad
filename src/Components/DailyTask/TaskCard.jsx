import { useRef , useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon , Bars2Icon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import EditDailyTaskModal from "../Modals/EditDailyTaskModal";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function TaskCard({task,onDeleteTask,onDateChange,onTaskCompleted,handleTaskEdit}){

    const {attributes,listeners, setNodeRef,setActivatorNodeRef, transform , transition}=useSortable({id:task.id});

    const style={
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const dateInputRef = useRef(null);

    const getCompleteStatus=(id,e)=>{
        onTaskCompleted(id,e.target.checked);
    }
    
    const [rotate,setRotate]=useState(false)
    const showDiscription=()=>{
        setRotate((prev)=>!prev);
    }

    const [openEdit,setOpenEdit]=useState(false);

    const handleEdit=(status)=>{
        setOpenEdit(status)
    }
    return (
        <div className="flex flex-col">
            <div ref={setNodeRef}  style={style} key={task.id} className={`w-full flex justify-between items-center p-3 ${task.completed ? "bg-accent/50 line-through" : "bg-accent/80"}`}>
                <div className="flex items-center gap-1">
                    <Bars2Icon className="w-5 h-5 cursor-grab active:cursor-grabbing" ref={setActivatorNodeRef} {...attributes} {...listeners}/>
                    <p>{task.task}</p>
                </div>
                <p>{task.date || "No due date"}</p>
                <div className="flex justify-between w-48 items-center">
                    <input type="checkbox" checked={task.completed} onChange={(e)=>getCompleteStatus(task.id,e)}/>
                    <CalendarDaysIcon className="w-5 h-5 hover:text-blue-400 cursor-pointer" onClick={() => dateInputRef.current.showPicker()}/>
                    <input
                    type="date"
                    ref={dateInputRef}
                    className="absolute opacity-0 w-0 h-0 pointer-events-none"
                    onChange={(e)=>onDateChange(task.id,e.target.value)}
                    />
                    <PencilIcon className="w-5 h-5 hover:text-blue-400" onClick={()=>handleEdit(true)}/>
                    <TrashIcon className="w-5 h-5 hover:text-red-400" onClick={() => onDeleteTask(task.id)}/>
                    <ChevronDownIcon className={`w-5 h-5 hover:text-blue-400 ${rotate? "rotate-180":"rotate-0"}`} onClick={showDiscription}/>
                </div>
            </div>

            {rotate &&
                <div className={`w-full border-t-2 border-on-surface  p-3 ${task.completed ? "bg-accent/50 line-through" : "bg-accent/80"}`}>
                    <p className="underline">Description:</p>
                    <p>{task.taskDescription}</p>
                </div>

            }

            <EditDailyTaskModal
                isOpen={openEdit}
                onClose={()=>handleEdit(false)}
                onSave={(newName,newDescription)=>handleTaskEdit(task.id,newName,newDescription)}
                taskData={task}
            />
        </div>
    )
}

export default TaskCard