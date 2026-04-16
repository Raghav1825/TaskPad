import { Doughnut } from "react-chartjs-2";

function ProjectsAnalysisSection({projectTrack}){
    const data = {
        labels: ["Not Started", "In Progress", "Done"],
        datasets: [
            {
                label: "Projects",
                data: [
                    projectTrack.notStarted,
                    projectTrack.inProgress,
                    projectTrack.done
                ],
                backgroundColor: [
                    "#808080",
                    "#3b82f6",
                    "#22c55e"
                ],
                borderColor: [
                    "#ffffff",
                    "#ffffff",
                    "#ffffff"
                ],
                borderWidth: 2
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    }

    return(
        <div className="sticky  z-10 flex flex-col items-center w-full h-full  shadow-md shadow-primary rounded-lg p-4">
            <p className="text-3xl mb-4 text-center">Projects Analysis</p>

            <div className="w-3/4 h-3/4">
                <Doughnut data={data} options={options}/>
            </div>
        </div>
    )
}

export default ProjectsAnalysisSection;