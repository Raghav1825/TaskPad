import { useState} from "react";
import { useOutletContext } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import DailyTaskModal from "../Modals/DailyTaskModal";
import TaskCard from "./TaskCard";
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
        date:null,
        completed:false,
        };
        setDailyTask((prev) => {
            const incompleteTasks = prev.filter((task) => !task.completed);
            const completedTasks = prev.filter((task) => task.completed);

            return [...incompleteTasks, newTask, ...completedTasks];
        });
        setNextId((prev) => prev + 1);
    };

    const sortTasks = (tasks) => [
    ...tasks.filter((task) => !task.completed),
    ...tasks.filter((task) => task.completed),
    ];

    const handleDateChange=(id,date)=>{
        setDailyTask((prev)=>
            prev.map((task)=>
                task.id===id? {...task,date:date}:task
            )
        )
    }

    const handleTaskDeletion=(id)=>{
        let updatedDailyTask=dailyTask.filter((t)=>t.id!==id);
        setDailyTask(updatedDailyTask);
    }

    const handleTaskDone=(id,checked)=>{
        setDailyTask((prev) => {
        const updatedTasks = prev.map((task) =>
            task.id === id ? { ...task, completed: checked } : task
            );

            return sortTasks(updatedTasks);
        });
    }

    const handleTaskEdit=(id,newName,newDescription)=>{
        setDailyTask((prev)=>
            prev.map((task)=>task.id===id?{...task,task:newName,taskDescription:newDescription}:task)
        )
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
                        {
                            dailyTask.map((task)=>(
                                <TaskCard
                                    key={task.id} 
                                    task={task} 
                                    onDeleteTask={handleTaskDeletion} 
                                    onDateChange={handleDateChange}
                                    onTaskCompleted={handleTaskDone}
                                    handleTaskEdit={handleTaskEdit}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default DailyTask