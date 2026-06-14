import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import api from "../../api/apiClient";
function ProfileDetailsModal({isOpen,onClose,profileData}){
    if(!isOpen) return null;

    const [profileInfo,setProfileInfo]=useState({
        fullName:"",
        phoneNumber:"",
        email:""
    })

    useEffect(()=>{
        setProfileInfo({
            fullName:profileData.fullName,
            phoneNumber:profileData.phoneNumber,
            email:profileData.email
        })
    },[profileData]);


    const handleNameChange=(e)=>{
        setProfileInfo({...profileInfo,fullName:e.target.value});
    }
    const handlePhoneChange=(e)=>{
        setProfileInfo({...profileInfo,phoneNumber:e.target.value});
    }
    const handleEmailChange=(e)=>{
        setProfileInfo({...profileInfo,email:e.target.value});
    }

    const setNewProfileData=async()=>{
        try {
            await api.patch("/users/update-account-details",profileInfo);
            window.location.reload();
            onClose();
        } catch (error) {
            alert(error.message);
            onClose();
        }
    }

    return(
        <>  
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={onClose}></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-surface rounded-2xl shadow-xl p-6 flex flex-col gap-4 lg:w-xl md:w-lg">
                <div className="w-full flex justify-between items-center">
                    <p>Change details...</p>
                    <XMarkIcon className="w-7 h-7 cursor-pointer hover:text-red-400" onClick={onClose} />
                </div>
                
                <p className="text-on-surface/50 italic">Change Name:</p>
                <input type="text" value={profileInfo.fullName} onChange={handleNameChange} className="border h-11 p-3 rounded-lg" />
                <p className="text-on-surface/50 italic">Change Phone Number:</p>
                <input type="text" value={profileInfo.phoneNumber} onChange={handlePhoneChange} className="border h-11 p-3 rounded-lg" />
                <p className="text-on-surface/50 italic">Change Email:</p>
                <input type="email" value={profileInfo.email} onChange={handleEmailChange} className="border h-11 p-3 rounded-lg" />
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={setNewProfileData}>Save Changes</button>
            </div>
        </>
    );
}

export default ProfileDetailsModal