import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png';
import { useState } from "react";
function NavBar({ isLoggedIn, setIsLoggedIn }){

    const handleLogin=()=>{
        setIsLoggedIn(true);
    }

    return(
        <div className="min-w-full md:min-h-15 min-h-13  border-b-4 border-primary flex items-center p-1 justify-between">
            {/* Icon for mobile */}
            <div className="hover md:hidden">
                <Bars3Icon className="w-10 md:hidden text-logo-bg"/>
            </div>
            {/* Website Icon */}
            <div className="h-12 min-w-32 bg-on-surface rounded-xl">
                <img src={logo} className="max-w-full max-h-full object-contain"/>
            </div>

            {/* Project button */}
            <div className="hidden  w-2xs h-12 md:flex items-center justify-around flex-row">
                <button className="h-9 w-24 text-accent rounded-xl  hover:scale-105 ease-in-out duration-200">Projects</button>
                <button className="h-9 w-24 text-accent rounded-xl  hover:scale-105 ease-in-out duration-200">Daily Task</button>
            </div>
            {/* Login Button*/}
            {!isLoggedIn &&
                <button className="hidden md:block h-9 w-36 bg-on-surface text-black rounded-xl shadow-md shadow-black hover:scale-105 ease-in-out duration-200" onClick={handleLogin}>    
                    Login/Sign Up
                </button>
            }
            {/* Profile */}
            {isLoggedIn &&
                <div className="hidden md:block">
                    <UserCircleIcon className="w-9 h-9 text-logo-bg" />
                </div>
            }
        </div>
    )
}
export default NavBar