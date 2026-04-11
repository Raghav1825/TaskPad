import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
function SlideMenu({onClose,openStatus,isLoggedIn,closeLogin}){
    if(!openStatus) return null;

    return(
        <div className="md:hidden ">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-0 left-0 h-full w-3xs  bg-surface z-50 flex flex-col p-10 ">
                <div className="mb-16 flex justify-end">
                    <XMarkIcon className="w-7 h-7 cursor-pointer" onClick={onClose}/>
                </div>
                <div className="flex flex-col gap-10 text-3xl">
                    {!isLoggedIn &&
                    <button className="h-9 w-36 text-lg bg-on-surface text-black rounded-xl shadow-md shadow-black hover:scale-105 ease-in-out duration-200" onClick={closeLogin}>    
                        Login/Sign Up
                    </button>
                    }
                    <Link to={""}>  
                        <div onClick={onClose} className="hover:text-accent ease-in-out duration-200 cursor-pointer">
                            <p>Home</p>
                        </div>
                    </Link>
                    <Link to={"/projects"}>
                        <div onClick={onClose} className="hover:text-accent ease-in-out duration-200 cursor-pointer">
                            <p>Project</p>
                        </div>
                    </Link>
                    <div onClick={onClose} className="hover:text-accent ease-in-out duration-200 cursor-pointer">
                        <p>Daily Task</p>
                    </div>
                    <div onClick={onClose} className="hover:text-accent ease-in-out duration-200 cursor-pointer">
                        <p>Profile</p>
                    </div>
                </div>
                <div className="hover:text-accent ease-in-out duration-200 fixed bottom-9 text-xl cursor-pointer" onClick={onClose}>
                    <div className="w-[90%] border-t-2 border-gray-500 mb-2"></div>
                    <p>Settings</p>
                </div>
            </div>
        </div>
    );
}
export default SlideMenu