import { useOutletContext } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import api from "../../api/apiClient.js";
import { useEffect, useState , useRef } from "react";
import ProfileDetailsModal from "../Modals/ProfileDetailsModal.jsx";
import ProfilePasswordChangeModal from "../Modals/ProfilePasswordChangeModal.jsx";
function Profile(){
    const {isLoggedIn}=useOutletContext();
    const [profile,setProfile]=useState(null);
    const fileInputRef = useRef(null);
    const [modalStatus,setModalStatus]=useState(false);
    const [passwordModalStatus,setPasswordModalStatus]=useState(false);

    useEffect(()=>{
        const fetchProfile=async()=>{
            try {
                const response=await api.get("/users/current-user");
                setProfile(response.data);
            } catch (error) {
                alert(error.message);
            }
        }
        fetchProfile();
    },[]);

    const handelProfileDetailsModal=(status)=>{
        setModalStatus(status);
    }

    const handlePasswordModalStatus=(status)=>{
        setPasswordModalStatus(status);
    }

    const handleProfileImageChange=(e)=>{
        changeProgileImage(e.target.files[0]);
    }

    const changeProgileImage = async(file)=>{
        try {
            const formData = new FormData();
            formData.append("profileImage",file);
            await api.patch("/users/update-profile-image",formData);
            const response=await api.get("/users/current-user");
            setProfile(response.data);
        } catch (error) {
            alert(error.message);
        }
    }


    return(
        <>
          {!isLoggedIn&&
            <div className="w-full h-full border-dashed border-6 rounded-2xl border-primary flex items-center justify-center">
                <p className="text-4xl hover:underline cursor-pointer text-accent">Login/Sign Up to Continue</p>
            </div>
          }  
          {isLoggedIn&&profile&&

          <div className="flex w-full h-full flex-col items-center">

            <div className="flex flex-col justify-center items-center gap-5">
                <img src={profile.profileImage} className="w-40 h-40 border-3 border-accent rounded-full"/>
                <button onClick={()=>fileInputRef.current.click()} className="flex gap-4 p-2 rounded-lg bg-primary cursor-pointer">
                    <PencilSquareIcon className="w-5 h-5"/>
                    <p>Edit Image</p>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange}/>
            </div>

            <div className="flex flex-col justify-center items-center mt-7 w-full p-3">
                <p className="text-2xl mb-7 underline decoration-dotted underline-offset-2">Personal Information</p>
                <div>
                    <p className="mb-4"><span className="font-bold">Name:</span> {profile.fullName}</p>
                    <p className="mb-4"><span className="font-bold">Phone Number:</span> {profile.phoneNumber}</p>
                    <p className="mb-4"><span className="font-bold">Email:</span> {profile.email}</p>
                </div>
                <button onClick={()=>handelProfileDetailsModal(true)} className="rounded-lg bg-primary p-2 mt-2 cursor-pointer">
                    <p>Change Details</p>
                </button>
                <button className="rounded-lg bg-primary p-2 mt-2 cursor-pointer" onClick={()=>handlePasswordModalStatus(true)}>
                    <p>Change Password</p>
                </button>
            </div>
            <ProfileDetailsModal isOpen={modalStatus} onClose={()=>handelProfileDetailsModal(false)} profileData={profile}/>
            <ProfilePasswordChangeModal isOpen={passwordModalStatus} onClose={()=>handlePasswordModalStatus(false)}/>
          </div>

          }
        </>
    )
}
export default  Profile