import { useParams } from "react-router-dom";
import { useState } from "react";
import { InformationCircleIcon ,TrashIcon ,PencilIcon } from "@heroicons/react/24/outline";
import TaskNotStarted from "./TaskNotStarted";
import TaskInProgress from "./TaskInProgress";
import TaskDone from "./TaskDone";
import AnalyseBox from "./AnalyseBox";
import MemberSection from "./MembersSection";
function MainBoard(){
    const {projectId}=useParams();

    const [descriptionDisplay,setDescriptionDisplay]=useState(false);

    const handleDescriptionDispay=()=>{
        setDescriptionDisplay((prev)=>(!prev));
    }

    // Sample task data. Keep taskStatus values stable for filtering and DND later.
    const [sampleTasks,setSampleTasks] = useState([
        {
            id: "task-1",
            taskName: "Create project dashboard",
            taskDescription: "Build the main dashboard layout with project summary, owner details, and board navigation.",
            taskStatus: "not started",
            addedBy: "Raghav Arora",
            editedBy: null,
            activityText: "Raghav Arora added this task",
        },
        {
            id: "task-2",
            taskName: "Design task cards",
            taskDescription: "Create the card UI that shows task name, description preview, status, and member activity.",
            taskStatus: "in progress",
            addedBy: "Aarav Sharma",
            editedBy: "Raghav Arora",
            activityText: "Raghav Arora edited this task",
        },
        {
            id: "task-3",
            taskName: "Set up project routes",
            taskDescription: "Connect board pages with route params so each project can open its own kanban board.",
            taskStatus: "done",
            addedBy: "Neha Verma",
            editedBy: "Aarav Sharma",
            activityText: "Aarav Sharma edited this task",
        },
        {
            id: "task-4",
            taskName: "Add drag and drop support",
            taskDescription: "Allow tasks to move between Not Started, In Progress, and Done columns.",
            taskStatus: "not started",
            addedBy: "Raghav Arora",
            editedBy: null,
            activityText: "Raghav Arora added this task",
        },
    ]);

    const notStartedTasks = sampleTasks.filter((task) => task.taskStatus === "not started");
    const inProgressTasks = sampleTasks.filter((task) => task.taskStatus === "in progress");
    const doneTasks = sampleTasks.filter((task) => task.taskStatus === "done");
    
    const handleStatusChange=(id,newStatus)=>{
        setSampleTasks((prev)=>(
            prev.map((task)=>task.id===id?{...task,taskStatus:newStatus}:task)
        ));
    }

    const DeleteTask=(id)=>{
        setSampleTasks((prev)=>prev.filter((task)=>task.id!==id));
    }

    const taskTrack = {
        notStarted: notStartedTasks.length,
        inProgress: inProgressTasks.length,
        done: doneTasks.length,
    };
    return(
        <div className="w-full h-full p-1">
                <div className="w-full shadow-xl flex flex-col mb-3">
                    <div className="w-full flex justify-between p-3">
                        <p className="text-3xl sm:mr-0 mr-2">Project Name</p>

                        <div className="flex gap-4 items-center">
                            <p className="text-on-surface/50 text-sm sm:block hidden">Owner: Raghav Arora</p>
                            <button onClick={handleDescriptionDispay} className="cursor-pointer bg-primary p-1 rounded-xl">{!descriptionDisplay?"Show Description":"Hide Description"}</button>
                            <button className="flex items-center justify-between w-20 bg-primary p-2 rounded-xl cursor-pointer">
                                <PencilIcon className="w-5 h-5"/>
                                <p>Edit</p>
                            </button>
                            <div className="bg-red-400 p-1 rounded-xl hover:scale-105 ease-in-out duration-200 cursor-pointer">
                                <TrashIcon className="w-7 h-7"/>
                            </div>
                            <InformationCircleIcon className="w-9 h-9 md:hidden"/>
                        </div>
                    </div>

                    {descriptionDisplay&&
                        <div className="flex flex-col p-3 text-on-surface/50 text-xs">
                            <p className="underline underline-offset-2">Description:</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates error nulla nesciunt 
                            magni assumenda quidem, omnis excepturi tenetur beatae ipsum sint quia eaque illo, nihil 
                            necessitatibus. Doloribus totam quae id!</p>
                        </div>
                    }
                </div>

                <div className="w-full flex-1 min-h-0 flex">
                    <div className="w-6xl md:flex gap-6 block">
                        <TaskNotStarted 
                            tasks={notStartedTasks} 
                            statusChange={handleStatusChange}
                            taskDeletion={DeleteTask}
                        />
                        <TaskInProgress 
                            tasks={inProgressTasks} 
                            statusChange={handleStatusChange}
                            taskDeletion={DeleteTask}
                        />
                        <TaskDone 
                            tasks={doneTasks}
                            statusChange={handleStatusChange}
                            taskDeletion={DeleteTask}
                        />
                    </div>
                    <div className="w-2xs pl-2 hidden md:flex flex-col gap-6">
                        <AnalyseBox taskTrack={taskTrack}/>
                        <MemberSection/>
                    </div>
                </div>
        </div>
    )
}
export default MainBoard
