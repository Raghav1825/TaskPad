import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import api from "../../api/apiClient";
function ProfilePasswordChangeModal({isOpen,onClose}){
    if(!isOpen) return null;

    const [oldPassword,setOldPassword]=useState(null);
    const [newPassword,setNewPassword]=useState(null);
    const [rePassword,setRePassword]=useState(null);

    const handleOldPasswordChange=(e)=>{setOldPassword(e.target.value)};
    const handleNewPasswordChange=(e)=>{setNewPassword(e.target.value)};
    const handleRePasswordChange=(e)=>{setRePassword(e.target.value)};
    
    const changePassword=async()=>{
        try {
            if(newPassword !== rePassword){
                alert("Passwords do not match");
                return;
            }
            await api.patch("/users/change-password",{
                oldPassword,
                newPassword
            });
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
                
                <p className="text-on-surface/50 italic">Old Password:</p>
                <input type="text" className="border h-11 p-3 rounded-lg" placeholder="Enter Old Password" onChange={handleOldPasswordChange}/>
                <p className="text-on-surface/50 italic">New Password:</p>
                <input type="text" className="border h-11 p-3 rounded-lg" placeholder="Enter New Password" onChange={handleNewPasswordChange}/>
                <p className="text-on-surface/50 italic">Re-enter new password:</p>
                <input type="text" className="border h-11 p-3 rounded-lg" placeholder="Enter the new password again" onChange={handleRePasswordChange}/>
                <button className="bg-primary rounded-lg h-8 cursor-pointer" onClick={changePassword}>Save Changes</button>
            </div>
        </>
    );
}

export default ProfilePasswordChangeModal