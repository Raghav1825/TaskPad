import Stepper , {Step} from "../UI/Stepper";
import { Link } from "react-router-dom";
function Login(){
  return (
    <>
      <div className="fixed inset-0 bg-surface backdrop-blur-sm z-40" ></div>
  
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 lg:w-xl md:w-lg">
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={() => console.log("All steps completed!")}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <p className="text-center text-accent text-3xl mb-2 underline underline-offset-2">Login</p>

            <div className="flex flex-col items-center gap-2">
              <input type="text" placeholder="Enter Username" className="border w-3/4 p-2 rounded-lg border-accent"/>
              <input type="password" placeholder="Enter Password" className="border w-3/4 p-2 rounded-lg border-accent"/>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-8">
              <div>
                Captcha Box
              </div>
              <input type="text" placeholder="Enter the Captcha" className="border w-3/4 p-2 rounded-lg border-accent"/>
            </div>
            <Link to={"/signup"}>
              <p className="text-accent text-center mt-5 underline underline-offset-2 text-xl hover:text-blue-400 cursor-pointer">New User? Create Account...</p>
            </Link>
          </Step>

          <Step>
            <div className="flex flex-col items-center justify-center gap-4 mb-0.5">
              <p className="text-accent text-center">Enter the OTP sent on your eamil address: rag*****av@gmail.com</p>
              <input type="text" placeholder="Enter OTP" className="border w-3/4 p-2 rounded-lg border-accent"/>
            </div>
          </Step>
          <Step>
            <p className="text-accent text-center text-2xl">Congrulations!!!</p>
            <p className="text-accent text-center text-2xl">You Have Sccessfully Logged In.</p>
          </Step>
        </Stepper>
      </div>
    </>
  )
}

export default Login