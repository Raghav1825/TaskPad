import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import DailyTaskModal from "../Modals/DailyTaskModal";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
function DailyTask(){
    const {isLoggedIn}=useOutletContext();
    const [modalStatus,setModalStatus]=useState(false);
    const [nextId, setNextId] = useState(1);

    const handelTaskModal=(status)=>{
        setModalStatus(status);
    }

    const [dailyTask,setDailyTask]=useState([]);

    const handleTaskAddition = ({ task, taskDescription }) => {
        const newTask = {
        id: nextId,
        task,
        taskDescription,
        };
        setDailyTask((prev) => [...prev, newTask]);
        setNextId((prev) => prev + 1);
    };

    const handleTaskDeletion=(id)=>{
        let updatedDailyTask=dailyTask.filter((t)=>t.id!==id);
        setDailyTask(updatedDailyTask);
    }

    const handleTaskBg=(e)=>{
        if(e.target.value){
            
        }
        else{

        }
    }

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

                    <DailyTaskModal isOpen={modalStatus} onClose={()=>handelTaskModal(false)} onAddTask={handleTaskAddition}/>

                    <div className="flex flex-col gap-4 p-3">
                        {dailyTask.map((task)=>(
                            <div key={task.id} className="w-full flex justify-between items-center p-3 bg-accent/60">
                                <p>{task.task}</p>
                                <p>Due Date</p>
                                <div className="flex justify-between w-48 items-center">
                                    <input type="checkbox" onChange={handleTaskBg}/>
                                    <CalendarDaysIcon className="w-5 h-5 hover:text-blue-400"/>
                                    <input type="date" className="hidden"/>
                                    <PencilIcon className="w-5 h-5 hover:text-blue-400"/>
                                    <TrashIcon className="w-5 h-5 hover:text-red-400" onClick={() => handleTaskDeletion(task.id)}/>
                                    <ChevronDownIcon className="w-5 h-5 hover:text-blue-400"/>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default DailyTask