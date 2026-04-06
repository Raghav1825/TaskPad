import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
function RecentSection(props){
    const [recentProject,setRecentProjects]=useState(["Matlab","DAA","Expense Website","Spring Boot Learning","ML Learning"]);
    return(
        <div className="w-full border-3 border-primary rounded-xl  mt-8 shadow-lg shadow-primary ">
            { props.loginStatus && recentProject.length>0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Recently viewed projects</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       {
                            
                            recentProject.map((project,index)=>(
                                <div key={index} value={project} className="flex border-accent  border shadow-md shadow-accent rounded-xl items-center justify-between p-3  flex-wrap w-full sm:w-auto">
                                    <p className="mr-3">{index+1}. {project}</p>
                                    <ExclamationCircleIcon className="w-6 h-7"/>    
                                </div>
                            ))
                       }
                    </div>
                </div>

            }
            { props.loginStatus && recentProject.length==0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Recently viewed projects</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       <p className="text-xl text-gray-500">No projects viewed recently. Start working now....</p>
                    </div>
                </div>

            }
            {
                !props.loginStatus &&

                <div className="h-52 p-5 flex flex-col">
                    <p className="text-2xl mb-2">Recently viewed projects</p>
                    <div className="flex items-center justify-center w-full h-full  text-accent rounded-xl border-7 border-dashed border-primary">
                        <p className="text-2xl">Please Login/Sign up  to continue</p>
                    </div>
                </div>
            }
        </div>
    )
}
export default RecentSection