import { useOutletContext } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ProfileImage from "../../assets/tab_logo.png";
function Profile(){
    const {isLoggedIn}=useOutletContext();
    return(
        <>
          {!isLoggedIn&&
            <div className="w-full h-full border-dashed border-6 rounded-2xl border-primary flex items-center justify-center">
                <p className="text-4xl hover:underline cursor-pointer text-accent">Login/Sign Up to Continue</p>
            </div>
          }  
          {isLoggedIn&&

          <div className="flex w-full h-full flex-col items-center">

            <div className="flex flex-col justify-center items-center gap-5">
                <img src={ProfileImage} className="w-40 h-40 border-3 border-accent rounded-full"/>
                <button className="flex gap-4 p-2 rounded-lg bg-primary cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5"/>
                    <p>Edit Image</p>
                </button>
            </div>

            <div className="flex flex-col justify-center items-center mt-7 w-full p-3">
                <p className="text-2xl mb-7 underline decoration-dotted underline-offset-2">Personal Information</p>
                <div>
                    <p className="mb-4"><span className="font-bold">Name:</span> Raghava Arora</p>
                    <p className="mb-4"><span className="font-bold">Phone Number:</span> 9414212255</p>
                    <p className="mb-4"><span className="font-bold">Email:</span> raghavarora@gmail.com</p>
                    <p className="mb-4"><span className="font-bold">Date of birth:</span> 18/02/2005</p>
                    <p className="mb-4"><span className="font-bold">Password:</span> ***************</p>
                </div>
                <button className="rounded-lg bg-primary p-2 mt-2 cursor-pointer">
                    <p>Change Details</p>
                </button>
            </div>

          </div>

          }
        </>
    )
}
export default  Profile