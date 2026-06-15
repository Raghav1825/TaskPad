import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png';
import { useState } from "react";
import SlideMenu from "./SlideMenu";
import { Link } from "react-router-dom";
function NavBar({ isLoggedIn}){
    const [slideMenuStatus,setSlideMenuStatus]=useState(false);
    const handleSlideMenu=(status)=>{
        setSlideMenuStatus(status)
    }

    return(
        <div className="min-w-full md:min-h-15 min-h-13  border-b-4 border-primary flex items-center p-1 justify-between">
            {/* Icon for mobile */}
            <div className="hover md:hidden">
                <button className="cursor-pointer"><Bars3Icon className="w-10 md:hidden text-on-surface" onClick={()=>handleSlideMenu(true)}/></button>
            </div>

            <SlideMenu onClose={()=>handleSlideMenu(false)} openStatus={slideMenuStatus} isLoggedIn={isLoggedIn}/>

            {/* Website Icon */}
            <div className="h-12 min-w-32 bg-logo-bg rounded-xl">
                <img src={logo} className="max-w-full max-h-full object-contain"/>
            </div>

            {/* Project button */}
            <div className="hidden  w-2xs h-12 md:flex items-center justify-around flex-row">
                <Link to={"/projects"}>
                    <button className="h-9 w-24 text-primary rounded-xl  hover:scale-105 ease-in-out duration-200">Projects</button>
                </Link>
                
                <Link to={"/dailytask"}>
                    <button className="h-9 w-24 text-primary rounded-xl  hover:scale-105 ease-in-out duration-200">Daily Task</button>
                </Link>
            </div>
            {/* Login Button*/}
            {!isLoggedIn &&
                <Link to={"/login"}>
                    <button className="hidden md:block h-9 w-36 bg-btn-login-bg text-btn-login-text rounded-xl shadow-md shadow-black hover:scale-105 ease-in-out duration-200">    
                        Login/Sign Up
                    </button>
                </Link>
            }
            {/* Profile */}
            {isLoggedIn &&
                <div className=" relative group hidden md:block">
                    <UserCircleIcon className="w-9 h-9 text-btn-login-bg" />
                    <div className="absolute top-0 right-8 mb-2 hidden group-hover:flex bg-black text-white text-xs rounded-md shadow-lg p-2 whitespace-nowrap z-50">
                        <p>You are logged in</p>
                        <div className="absolute top-full right-2 border-4 border-transparent border-t-black"></div>
                    </div>
                </div>
            }
        </div>
    )
}
export default NavBar