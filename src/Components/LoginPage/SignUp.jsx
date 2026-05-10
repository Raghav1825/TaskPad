import Stepper , {Step} from "../UI/Stepper";
import { Link } from "react-router-dom";
function SignUp(){
    return(
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
                            <p className="text-3xl text-center text-accent underline underline-offset-2 mb-6">Sign Up</p>
                            <div className="flex gap-2 items-center mb-4">
                                <p className="text-accent">Name:</p>
                                <input type="text" placeholder="Enter your name" className="w-1/2 p-2 border border-accent rounded-lg"/>
                            </div>
                            <div className="flex gap-2 items-center mb-4">
                                <p className="text-accent">Date of Birth:</p>
                                <input type="date" className="w-1/2 p-2 border border-accent rounded-lg "/>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <p className="text-accent">Username:</p>
                                <input type="text" placeholder="Enter a unique username" className="w-1/2 p-2 border border-accent rounded-lg"/>
                            </div>
                            <Link to={"/login"}>
                                <p className="text-accent text-center mt-5 underline underline-offset-2 text-xl hover:text-blue-400 cursor-pointer">Already have a account? Login..</p>
                            </Link>
                        </Step>

                        <Step>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">Phone Number:</p>
                                <input type="number" placeholder="Enter your phone number" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                        </Step>

                        <Step>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">OTP is send to your phone number 9414*****12</p>
                                <input type="text" placeholder="Enter the OTP here" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                        </Step>

                        <Step>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">Email:</p>
                                <input type="email" placeholder="Enter your Email ID" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                        </Step>

                        <Step>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">OTP is sent to your email id rag****av@gmail.com</p>
                                <input type="text" placeholder="Enter the OTP here" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                        </Step>

                        <Step>
                            <p className="text-2xl text-center text-accent">Congrats!!!</p>
                            <p className="text-2xl text-center text-accent">Your Account is created.</p>
                        </Step>
                    </Stepper>
            </div>
        </>
    )
}
export default SignUp