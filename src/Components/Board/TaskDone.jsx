import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
function TaskDone({tasks,onSuccess}){
    let n=tasks.length;
    let empty=n>0?false:true;

    const { isOver, setNodeRef } = useDroppable({
        id: "done",
    });
    return(
        <div ref={setNodeRef} className={`w-full mb-4 md:w-1/3 rounded-xl border border-green-400 shadow-lg shadow-green-400 p-2 ${
                isOver
                    ? "border-green-300 bg-green-400/10 scale-[1.02] shadow-xl shadow-green-300"
                    : "border-green-400 shadow-green-400"
            }`}>
            <div className="w-full flex p-1 items-center justify-between border-b-2 border-green-400 mb-1">
                <p>Done</p>
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
export default TaskDone