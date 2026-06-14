import { useState,useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import DailyTaskModal from "../Modals/DailyTaskModal";
import TaskCard from "./TaskCard";
import { DndContext,KeyboardSensor,PointerSensor,TouchSensor,closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy ,arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import api from "../../api/apiClient.js";   
function DailyTask(){
    const {isLoggedIn}=useOutletContext();
    const [modalStatus,setModalStatus]=useState(false);
    const [dailyTask,setDailyTask]=useState([]);


    const handelTaskModal=(status)=>{
        setModalStatus(status);
    }
    const fetchDailyTask=async()=>{
        try{
            const response= await api.get("/dailyTasks/all-tasks");
            setDailyTask(sortTasks(response.data));
        }catch(error){
            alert(error.message);
        }
    }
    useEffect(()=>{
        fetchDailyTask();
    },[])

    const sortTasks = (tasks) => [
    ...tasks.filter((task) => !task.completed),
    ...tasks.filter((task) => task.completed),
    ];


    const handleDragEnd=(e)=>{
        const {active,over}=e;

        if(!over ||active.id === over.id) return;

        setDailyTask((prev)=>{
            const draggedTask = prev.find((t) => t._id === active.id);
            const overTask = prev.find((t) => t._id === over.id);
            if (draggedTask.completed !== overTask.completed) return prev;
            const oldIndex = prev.findIndex((task) => task._id === active.id);
            const newIndex = prev.findIndex((task) => task._id === over.id);

            return arrayMove(prev, oldIndex, newIndex);
        });
    }

    const sensors=useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor,{
            coordinateGetter:sortableKeyboardCoordinates,
        })
    )
    return(
        <div className="w-full h-full flex flex-row">
            {!isLoggedIn&&

              <p>Login/Signup to continue....</p>

            }

            {isLoggedIn&&
                <div className="w-full h-full flex-row">
                    <div className="bg-surface w-full flex justify-between items-center pr-3 pl-3 pb-3 shadow-lg">
                        <p className="text-4xl">Daily Task's</p>
                        <button onClick={()=>handelTaskModal(true)} className="cursor-pointer flex gap-2 items-center justify-center rounded-2xl hover:scale-105 duration-200 bg-primary p-2 md:w-56">
                            <PlusIcon className="w-6 h-6"/>
                            <p>Add new task</p>
                        </button>
                    </div>

                    <DailyTaskModal isOpen={modalStatus} onClose={()=>handelTaskModal(false)} onSuccess={fetchDailyTask}/>

                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
                        <div className="flex flex-col gap-4 p-3">
                            <SortableContext items={dailyTask.map((task)=>task._id)} strategy={verticalListSortingStrategy}>
                                {
                                    dailyTask.map((task)=>(
                                        <TaskCard
                                            key={task._id} 
                                            task={task} 
                                            onSuccess={fetchDailyTask}
                                        />
                                    ))
                                }
                            </SortableContext>
                        </div>
                    </DndContext>
                </div>
            }
        </div>
    )
}
export default DailyTask