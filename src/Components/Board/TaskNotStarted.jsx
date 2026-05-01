import TaskCard from "./TaskCard";
import { PlusIcon } from "@heroicons/react/24/outline";
function TaskNotStarted({tasks,statusChange,taskDeletion}){
    let n=tasks.length;
    let empty=n>0?false:true;

    return(
        <div className="w-full md:w-1/3 rounded-xl border border-gray-400 shadow-lg shadow-gray-400 mb-4 p-2">
            <div className="w-full flex p-1 items-center justify-between border-b-2 border-gray-400 mb-1">
                <p>Not Started</p>
                <PlusIcon className="w-6 h-6 cursor-pointer"/>
            </div>
            <div className="flex flex-col gap-2">
                {empty &&
                    <div className="w-full h-28 flex justify-center items-center">
                        <p>Empty Task list</p>
                    </div>
                }
                {!empty&&
                    tasks.map((task)=>(<TaskCard task={task}/>))
                }
            </div>
        </div>
    )
}
export default TaskNotStarted