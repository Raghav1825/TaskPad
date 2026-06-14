import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InformationCircleIcon ,TrashIcon ,PencilIcon } from "@heroicons/react/24/outline";
import TaskNotStarted from "./TaskNotStarted";
import TaskInProgress from "./TaskInProgress";
import TaskDone from "./TaskDone";
import AnalyseBox from "./AnalyseBox";
import MemberSection from "./MembersSection";
import api from "../../api/apiClient.js";
function MainBoard(){
    const {projectId}=useParams();
    const [projectTasks,setProjectTasks]=useState([]);
    const [projectDetails,setProjectDetails]=useState(null);
    const [projectOwner,setProjectOwner]=useState(null);

    const [descriptionDisplay,setDescriptionDisplay]=useState(false);

    const handleDescriptionDispay=()=>{
        setDescriptionDisplay((prev)=>(!prev));
    }

    const fetchAllTask = async()=>{
        try {
            const response = await api.get(`/projectTasks/get-project-tasks/${projectId}`);
            setProjectTasks(response.data);
        } catch (error) {
            alert(error.message);
        }
    }

    const fetchProjectDetails=async()=>{
        try{
            const response = await api.get(`/projects/get-project-details/${projectId}`);
            setProjectDetails(response.data);
        }catch(error){
            alert(error.message);
        }
    }

    const fetchOwner=async()=>{
        try{
            const response =await api.get(`/users/${projectDetails.owner}`);
            setProjectOwner(response.data.fullName);
        }catch(error){
            alert(error.message);
        }
    }
        
    useEffect(()=>{
        fetchAllTask();
        fetchProjectDetails();
    },[])

    useEffect(()=>{
        if(projectDetails){
            fetchOwner();
        }
    },[projectDetails])
    

    const notStartedTasks = projectTasks.filter((task) => task.taskStatus === "not started");
    const inProgressTasks = projectTasks.filter((task) => task.taskStatus === "in progress");
    const doneTasks = projectTasks.filter((task) => task.taskStatus === "done");
    
    

    const taskTrack = {
        notStarted: notStartedTasks.length,
        inProgress: inProgressTasks.length,
        done: doneTasks.length,
    };
    return(
        <div className="w-full h-full p-1">
                <div className="w-full shadow-xl flex flex-col mb-3">
                    <div className="w-full flex justify-between p-3">
                        <p className="text-3xl sm:mr-0 mr-2">{projectDetails?.projectName}</p>

                        <div className="flex gap-4 items-center">
                            <p className="text-on-surface/50 text-sm sm:block hidden">Owner: {projectOwner}</p>
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
                            <p>{projectDetails.projectDescription}</p>
                        </div>
                    }
                </div>

                <div className="w-full flex-1 min-h-0 flex">
                    <div className="w-6xl md:flex gap-6 block">
                        <TaskNotStarted 
                            tasks={notStartedTasks} 
                            projectID={projectId}
                            onSuccess={fetchAllTask}
                        />
                        <TaskInProgress 
                            tasks={inProgressTasks} 
                            projectID={projectId} 
                            onSuccess={fetchAllTask} 
                        />
                        <TaskDone 
                            tasks={doneTasks}
                            projectID={projectId}
                            onSuccess={fetchAllTask}
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
