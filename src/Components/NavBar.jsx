import { Bars3Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png';
import { useState } from "react";
function NavBar(){
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    const handleLogin=(status)=>{
        setIsLoggedIn(status);
    }

    return(
        <div className="min-w-full md:min-h-15 min-h-13  border-b-4 border-[#982598] flex items-center p-1 justify-between">
            {/* Icon for mobile */}
            <div className="hover md:hidden">
                <Bars3Icon className="w-10 md:hidden"/>
            </div>
            {/* Website Icon */}
            <div className="h-12 min-w-32 bg-[#F1E9E9] rounded-xl">
                <img src={logo} className="max-w-full max-h-full object-contain"/>
            </div>

            {/* Project button */}
            <div className="hidden  w-2xs h-12 md:flex items-center justify-around flex-row">
                <button className="h-9 w-24 bg-[#982598] rounded-xl shadow-md shadow-[#E491C9] hover:scale-105 ease-in-out duration-200">Projects</button>
                <button className="h-9 w-24 bg-[#982598] rounded-xl shadow-md shadow-[#E491C9] hover:scale-105 ease-in-out duration-200">Daily Task</button>
            </div>
            {/* Login Button*/}
            {!isLoggedIn &&
                <button className="hidden md:block h-9 w-36 bg-amber-50 text-black rounded-xl shadow-md shadow-black hover:scale-105 ease-in-out duration-200" onClick={handleLogin}>    
                    Login/Sign Up
                </button>
            }
            {/* Profile */}
            {isLoggedIn &&
                <div className="hidden md:block">
                    <UserCircleIcon className="w-9 h-9 text-[#F1E9E9]" />
                </div>
            }
        </div>
    )
}
export default NavBar