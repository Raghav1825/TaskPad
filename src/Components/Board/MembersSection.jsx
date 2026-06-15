import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import api from "../../api/apiClient.js";
import { useEffect , useState } from "react";
import AddProjectMemberModal from "../Modals/AddProjectMemberModal.jsx";
import EditProjectMemberModal from "../Modals/EditProjectMemberModal.jsx";
function MemberSection({projectDetails}){
    if(!projectDetails) return null;
    const members=projectDetails.members;

    const [memberNames,setMemberNames]=useState([]);
    const [addProjectModal,setAddProjectModal]=useState(false);
    const [deleteMemberModal,setDeleteMemberModal]=useState(false);

    const handleDeleteMemberModal=(status)=>{
        setDeleteMemberModal(status);
    }
    const handleAddProjectModal=(status)=>{
        setAddProjectModal(status);
    }
    const fetchNames = async()=>{

        try {
            const response = await api.get(`/projects/get-project-details/${projectDetails._id}`);
            const data = await Promise.all(
                response.data.members.map(async(memberId)=>{
                    try{
                        const response = await api.get(`/users/${memberId}`);
                        return {id:memberId,name:response.data.fullName};
                    }catch(error){
                        console.log(error);
                        return null;
                    }
                })
            );
            setMemberNames(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(members?.length)fetchNames();
    },[members])   
    

    return(
        <div className="rounded-xl shadow-lg shadow-primary flex flex-col items-center gap-7 p-3">
            <div className="w-full flex justify-between items-center">
                <p className="text-3xl">Members</p>
                <button className="cursor-pointer">
                    <PlusIcon className="w-6 h-6 bg-primary rounded" onClick={()=>handleAddProjectModal(true)}/>
                </button>
                <button className="bg-primary p-1 text-sm cursor-pointer rounded-lg" onClick={()=>handleDeleteMemberModal(true)}>Edit</button>
            </div>

            <div className="w-full">
                {memberNames.map(member=>{
                    return(
                        <div key={member.id} className="flex justify-center border border-accent rounded-lg p-1 mb-1">
                            <p data-userId={member.id}>{member.name}</p>
                        </div>
                    )
                })}
            </div>
            <AddProjectMemberModal isOpen={addProjectModal} onClose={()=>handleAddProjectModal(false)} projectId={projectDetails._id} onSuccess={fetchNames}/>
            <EditProjectMemberModal isOpen={deleteMemberModal} onClose={()=>handleDeleteMemberModal(false)} projectId={projectDetails._id} onSuccess={fetchNames}/>
        </div>
    )
}
export default MemberSection