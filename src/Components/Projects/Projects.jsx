import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import ProjectModal from "../Modals/ProjectModal";
import ProjectsAnalysisSection from "./ProjectsAnalysisSection";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiClient";
function Project(){
    const {isLoggedIn}=useOutletContext();
    const navigate=useNavigate();
    
    const [project,setProject]=useState([]);
    const fetchProjects = async () => {
        try {
            const response = await api.get("/projects/all-projects");
            setProject(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        if(isLoggedIn){
            fetchProjects();
        }
    },[isLoggedIn])

    const [modalStatus,setModalStatus]=useState(false);

    const handelProjectModal=(status)=>{
        setModalStatus(status);
    }

    const getProjectTrack=()=>{
        const projectTrack = {
            notStarted: 0,
            inProgress: 0,
            done: 0
        }

        project.forEach((project)=>{
            if(project.projectStatus === "Not Started"){
                projectTrack.notStarted += 1;
            }
            else if(project.projectStatus === "In Progress"){
                projectTrack.inProgress += 1;
            }
            else if(project.projectStatus === "Done"){
                projectTrack.done += 1;
            }
        })

        return projectTrack;
    }
    const projectTrack = getProjectTrack();


    return(
            <div className="w-full h-full flex flex-row">
                {!isLoggedIn &&
                    <p>Login/Signup to continue....</p>

                }
                {isLoggedIn &&
                    <div className="w-full h-full flex p-1">
                        <div className="flex flex-wrap content-start gap-6 w-full md:w-3/4  p-2">
                            <div className="sticky top-0 z-10 bg-surface w-full flex justify-between items-center pr-3 pl-3 pb-3 shadow-lg">
                                <p className="text-4xl">Projects</p>
                                <button onClick={()=>handelProjectModal(true)} className="flex gap-2 items-center justify-center rounded-2xl hover:scale-105 duration-200 bg-primary p-2 md:w-56">
                                    <PlusIcon className="w-6 h-6"/>
                                    <p>Add new project</p>
                                </button>
                                <ProjectModal isOpen={modalStatus} onClose={()=>handelProjectModal(false)} onSuccess={fetchProjects}/>
                            </div>
                            {
                                project.map((project,index)=>
                                    <ProjectCard 
                                    key={project._id} 
                                    projectData={project} 
                                    index={index} 
                                    onOpenProject={()=>navigate(`/projects/${project._id}`)}
                                    onSuccess={fetchProjects}
                                    />
                                )
                            }
                        </div>
                        <div className="hidden md:block p-2 fixed right-4 top-16 w-[23%] h-[90vh]">
                                <ProjectsAnalysisSection projectTrack={projectTrack}/>
                        </div>
                    </div>
                }
            </div>
    )
}
export default Project
