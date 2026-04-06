import { HomeIcon } from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { UserIcon } from "@heroicons/react/24/outline"
import { Link } from "react-router-dom"
function SideBar(){
    return(
        <div className="hidden md:flex w-18 border-r-4 border-primary p-2 flex-col justify-between">

            <div className="h-44 w-full flex flex-col justify-between items-center">
                <Link to={""}>
                    <div className="text-on-surface h-15 w-full flex flex-col items-center justify-center hover:scale-105 ease-in-out duration-300 hover:text-accent">
                        <HomeIcon className="w-7 h-7 "/>
                        <p>Home</p>
                    </div>
                </Link>
                <div className="text-on-surface h-15 w-full flex flex-col items-center justify-center hover:scale-105 ease-in-out duration-300 hover:text-accent">
                    <UserIcon className="w-7 h-7"/>
                    <p>Profile</p>
                </div>
            </div>
            <div className="text-on-surface h-20 w-full flex flex-col items-center justify-center">
                <div className="w-[90%] border-t-2 border-gray-500 mb-4"></div>
                <Cog6ToothIcon className="w-7 h-7"/>
                <p>Settings</p>
            </div>
        </div>
    )
}
export default SideBar
