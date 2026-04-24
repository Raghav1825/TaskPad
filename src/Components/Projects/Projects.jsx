import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import ProjectModal from "../Modals/ProjectModal";
import ProjectsAnalysisSection from "./ProjectsAnalysisSection";
function Project(){
    const {isLoggedIn}=useOutletContext();
    const [projects, setProjects] = useState([
        {
            projectName: "Matlab",
            projectDescription: "Working on MATLAB programs and simulations for academic assignments and problem solving.",
            projectStatus: "Not Started"
        },
        {
            projectName: "DAA",
            projectDescription: "Studying Design and Analysis of Algorithms including sorting, graph algorithms, and complexity.",
            projectStatus: "Not Started"
        },
        {
            projectName: "Expense Website",
            projectDescription: "Building a web app to track expenses with features like adding, editing, and visualizing spending.",
            projectStatus: "Not Started"
        },
        {
            projectName: "Spring Boot Learning",
            projectDescription: "Learning backend development using Spring Boot, REST APIs, and database integration.",
            projectStatus: "Not Started"
        },
        {
            projectName: "ML Learning",
            projectDescription: "Exploring machine learning concepts including regression, classification, and model training.",
            projectStatus: "Not Started"
        },
        {
            projectName: "KanBan Board Website",
            projectDescription: "Developing a Kanban board using React and Tailwind with task management and project tracking features.",
            projectStatus: "Not Started"
        },
        {
            projectName: "ML Learning",
            projectDescription: "Exploring machine learning concepts including regression, classification, and model training.",
            projectStatus: "Not Started"
        },
        {
            projectName: "KanBan Board Website",
            projectDescription: "Developing a Kanban board using React and Tailwind with task management and project tracking features.",
            projectStatus: "Not Started"
        }
    ]);

    const [modalStatus,setModalStatus]=useState(false);

    const handelProjectModal=(status)=>{
        setModalStatus(status);
    }

    const handleProjectEdit = (index, updatedProject) => {
        const updatedProjects = projects.map((project, projectIndex) => {
            if (projectIndex === index) {
                return {
                    ...project,
                    projectName: updatedProject.projectName,
                    projectDescription: updatedProject.projectDescription,
                };
            }

            return project;
        });

        setProjects(updatedProjects);
    };


    const handelProjectStatusChange=(index,newStatus)=>{
        const updatedProjects = projects.map((project,projectIndex)=>{
            if(projectIndex === index){
                return {
                    ...project,
                    projectStatus: newStatus
                }
            }
            return project;
        })

        setProjects(updatedProjects);
    }

    const getProjectTrack=()=>{
        const projectTrack = {
            notStarted: 0,
            inProgress: 0,
            done: 0
        }

        projects.forEach((project)=>{
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
                        <div className="flex flex-wrap gap-6 w-full md:w-3/4  p-2">
                            <div className="sticky top-0 z-10 bg-surface w-full  flex justify-between items-center pr-3 pl-3 pb-3 shadow-lg">
                                <p className="text-4xl">Projects</p>
                                <button onClick={()=>handelProjectModal(true)} className="flex gap-2 items-center justify-center rounded-2xl hover:scale-105 duration-200 bg-primary p-2 md:w-56">
                                    <PlusIcon className="w-6 h-6"/>
                                    <p>Add new project</p>
                                </button>
                                <ProjectModal isOpen={modalStatus} onClose={()=>handelProjectModal(false)} />
                            </div>
                            {
                                projects.map((project,index)=>
                                    <ProjectCard 
                                    key={index} 
                                    projectData={project} 
                                    index={index} 
                                    handelProjectStatusChange={handelProjectStatusChange}
                                    handleProjectEdit={handleProjectEdit}
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