import { useOutletContext } from "react-router-dom";
import { SunIcon , MoonIcon,ArrowRightStartOnRectangleIcon ,TrashIcon } from "@heroicons/react/24/outline";
import {useTheme} from "../../context/ThemeContext";
import api from "../../api/apiClient";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import {useState} from "react";

function Settings(){

    const {isLoggedIn}=useOutletContext();

    const {theme, toggleTheme}=useTheme();

    const handleLogout=async()=>{
      try {
        const response = await api.post("/users/logout");
        window.location.assign('/');
      } catch (error) {
        console.log(error);
      }
    }

    const [deleteModalStatus,setDeleteModalStatus]=useState(false);
    const handelDeleteModalStatus=(status)=>{
        setDeleteModalStatus(status);
    }

    return(
        <div className="w-full h-full flex flex-col gap-10 ">
            <div className="p-3 w-full shadow-xl items-center">
                <p className="text-on-surface text-4xl">Settings</p>
            </div>
            <div className="w-full flex p-3 gap-52 h-16 items-center">
                <p className="text-2xl">Theme</p>

                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 h-11 text-lg px-4 rounded-xl border-2 border-primary text-on-surface hover:scale-105 ease-in-out duration-200 "
                    >
                    {theme === "dark" ? (
                        <>
                        <SunIcon className="w-6 h-6" />
                        <span>Light</span>
                        </>
                    ) : (
                        <>
                        <MoonIcon className="w-6 h-6" />
                        <span>Dark</span>
                        </>
                    )}
                </button>
            </div>
            {isLoggedIn&&
            <div className="flex flex-col  gap-10">
                <button className="flex  sm:w-1/4 items-center h-12 justify-between text-2xl p-3">
                    <p>Log Out</p>
                    <ArrowRightStartOnRectangleIcon className="w-8 h-8 cursor-pointer" onClick={handleLogout}/>
                </button>

                <button className="flex items-center justify-between rounded-xl hover:bg-red-500 hover:text-white p-3 sm:w-1/4 text-red-400 ease-in-out duration-200 cursor-pointer" onClick={()=>handelDeleteModalStatus(true)}>
                    <p className="text-2xl">Delete Account</p>
                    <TrashIcon className="w-8 h-8"/>
                </button>
            </div>
            }

            <DeleteAccountModal
                isOpen={deleteModalStatus}
                onClose={()=>handelDeleteModalStatus(false)}
            />
        </div>
    )
}

export default Settings