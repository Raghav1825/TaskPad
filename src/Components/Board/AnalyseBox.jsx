import { Doughnut } from "react-chartjs-2"
function AnalyseBox({taskTrack}){
    const data = {
        labels: ["Not Started", "In Progress", "Done"],
        datasets: [
            {
                label: "Tasks",
                data: [
                    taskTrack.notStarted,
                    taskTrack.inProgress,
                    taskTrack.done,
                ],
                backgroundColor: ["#808080", "#3b82f6", "#22c55e"],
                borderColor: ["#ffffff", "#ffffff", "#ffffff"],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };


    return(
        <div className="flex  flex-col items-center  gap-7 shadow-lg shadow-primary rounded-xl h-72">
            <p className="text-3xl">Analysis</p>
            
            <div className="w-full h-52">
                <Doughnut data={data} options={options}/>
            </div>
        </div>
    )
}

export default AnalyseBox