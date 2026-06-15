import { useState,useEffect } from "react";
import api from "../../api/apiClient.js";
function OwnerProjects(props){
    const [ownerProject,setOwnerProject]=useState([]);
    

    const fetchOwnerProjects=async()=>{
        try {
            const response=await api.get("/projects/owner-projects");
            setOwnerProject(response.data || []);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(()=>{
        fetchOwnerProjects();
    },[]);
    return(
        <div className="w-full  rounded-xl  mt-8 shadow-lg shadow-primary ">
            { props.loginStatus && ownerProject.length>0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Projects (you as a owner)</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       {
                            
                            ownerProject.map((project,index)=>(
                                <div key={index} value={project} className="flex border-accent  border shadow-md shadow-accent rounded-xl items-center justify-between p-3  flex-wrap w-full sm:w-auto">
                                    <p className="mr-3">{project.projectName}</p>    
                                </div>
                            ))
                       }
                    </div>
                </div>

            }
            { props.loginStatus && ownerProject.length==0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Projects (you as a owner)</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       <p className="text-xl text-gray-500">You are not the owner of any project. Start working now....</p>
                    </div>
                </div>

            }
            {
                !props.loginStatus &&

                <div className="h-52 p-5 flex flex-col">
                    <p className="text-2xl mb-2">Projects (you as a owner)</p>
                    <div className="flex items-center justify-center w-full h-full  text-accent rounded-xl border-7 border-dashed border-primary">
                        <p className="text-2xl">Please Login/Sign up  to continue</p>
                    </div>
                </div>
            }
        </div>
    )
}
export default OwnerProjects