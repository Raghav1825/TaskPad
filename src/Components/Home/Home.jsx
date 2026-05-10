import { PlusIcon } from "@heroicons/react/24/outline"
import BlurText from "../UI/BlurText"
import { useOutletContext } from "react-router-dom"
import RecentSection from "./RecentSection";
import TodaysTaskSection from "./TodaysTaskSection";
import ProjectModal from "../Modals/ProjectModal";
import { useState } from "react";
import DemoImage from "../../assets/demopage.png"
function Home(){
    
    const {isLoggedIn}=useOutletContext();
    const [modalStatus,setModalStatus]=useState(false);

    const handelProjectModal=(status)=>{
        setModalStatus(status);
    }
    return(
        <div className="w-full  flex flex-col items-center p-1">
            <button onClick={()=>handelProjectModal(true)} className="flex flex-row items-center border-2 h-10 w-3xs justify-center md:h-11 md:w-xl lg:h-12 lg:w-2xl rounded-2xl bg-primary border-none hover:shadow-lg hover:shadow-black hover:scale-105 ease-in-out duration-300 cursor-pointer">
                <PlusIcon className="w-8 h-8"/>
                <p className="ml-4">Add new project</p>
            </button>
            <ProjectModal isOpen={modalStatus} onClose={()=>handelProjectModal(false)} />
            <div className="mt-5 mb-8">
                <BlurText
                text="TaskPad — Organize Your Work. Move Faster."
                delay={150}
                animateBy="words"
                direction="top"
                className="text-xl md:text-3xl lg:text-5xl"
                />
            </div>
            {!isLoggedIn&&
                <div className="w-full mas-w-5xl px-3">
                    <img src={DemoImage} className="w-full h-4/5  rounded-2xl drop-shadow-2xl  drop-shadow-primary"/>
                </div>
            }
            <TodaysTaskSection loginStatus={isLoggedIn}/>
            <RecentSection loginStatus={isLoggedIn}/>
        </div>
    )
}
export default Home