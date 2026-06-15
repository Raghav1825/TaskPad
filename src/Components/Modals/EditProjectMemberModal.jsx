import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import api from "../../api/apiClient.js";
function EditProjectMemberModal({isOpen,onClose,onSuccess,projectId}){
    if(!isOpen) return null;
    const [email,setEmail]=useState("");

    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }

    const handleAddMember=async()=>{
        try {
            await api.delete(`/projects/delete-project-member/${projectId}`,{email:email});
            onSuccess();
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
                    <p>Delete a member...</p>
                    <XMarkIcon className="w-7 h-7 cursor-pointer hover:text-red-400" onClick={onClose} />
                </div>
                <p className="text-xl italic">Email:</p>
                <input type="text" placeholder="Enter email of member to delete" className="border h-11 p-3 rounded-lg" onChange={handleEmail}/>
                <button className="bg-red-500 rounded-lg h-8 cursor-pointer" onClick={handleAddMember} >Delete Member</button>
            </div>
        </>
    );
}

export default EditProjectMemberModal