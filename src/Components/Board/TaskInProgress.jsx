import TaskCard from "./TaskCard";
function TaskInProgress({tasks,onSuccess}){
    let n=tasks.length;
    let empty=n>0?false:true;
    return(
        <div className="w-full mb-4 md:w-1/3 rounded-xl border border-blue-400 shadow-lg shadow-blue-400 p-2">
            <div className="w-full flex p-1 items-center justify-between border-b-2 border-blue-400 mb-1">
                <p>In Progress</p>
            </div>
            <div className="flex flex-col gap-2">
                {empty &&
                    <div className="w-full h-28 flex justify-center items-center">
                        <p>Empty Task list</p>
                    </div>
                }
                {!empty&&
                    tasks.map((task)=>(<TaskCard task={task} onSuccess={onSuccess} key={task._id}/>))
                }
            </div>
        </div>
    )
}
export default TaskInProgress