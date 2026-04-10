import { useState } from "react"
function TodaysTaskSection(props){
    const [taskToday,setTaskToday]=useState(["Learn CSS better","Complete NPTEL Task","Do leetcode","Complete DAA Assignment" , "Start Probability lab assignment","Call Arjun for work","Complete Web task"])
    return(
        <div className="w-full  rounded-xl  mt-8 shadow-lg shadow-primary ">
            { props.loginStatus && taskToday.length>0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Today's Taks</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       {
                            
                            taskToday.map((task,index)=>(
                                <div key={index} value={task} className="flex  border-accent  border shadow-md shadow-accent rounded-xl items-center justify-between p-3  flex-wrap w-full sm:w-auto">
                                    <p className="mr-3">{index+1}. {task}</p>
                                    <input type="checkbox" value={task}/>
                                </div>
                            ))
                       }
                    </div>
                </div>

            }
            { props.loginStatus && taskToday.length==0 &&

                <div className="w-full  flex flex-col p-3 ">
                    <h2 className="text-2xl">Today's Taks</h2>
                    <div className="flex p-3  items-center flex-wrap gap-4 w-full ">
                       <p className="text-xl text-gray-500">No tasks added. Start now....</p>
                    </div>
                </div>

            }
            {
                !props.loginStatus &&

                <div className="h-52 p-5 flex flex-col">
                    <p className="text-2xl mb-2">Today's Task</p>
                    <div className="flex items-center justify-center w-full h-full  text-accent rounded-xl border-7 border-dashed border-primary">
                        <p className="text-2xl">Please Login/Sign up  to continue</p>
                    </div>
                </div>
            }
        </div>
    )
}
export default TodaysTaskSection