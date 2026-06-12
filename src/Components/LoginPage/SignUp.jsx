import Stepper , {Step} from "../UI/Stepper";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/apiClient";


function SignUp(){

    const [user,setUser]=useState({
        fullName:"",
        email:"",
        password:"",
        phoneNumber:""
    }) 
    
    const [profileImage,setProfileImage]=useState(null);

    const handleFullName=(e)=>{
        setUser(prev=>({...prev,fullName:e.target.value}))
    }
    const handlePassword=(e)=>{
        setUser(prev=>({...prev,password:e.target.value}))
    }
    const handlePhoneNumber=(e)=>{
        setUser(prev=>({...prev,phoneNumber:e.target.value}))
    }
    const handleEmail=(e)=>{
        setUser(prev=>({...prev,email:e.target.value}))
    }

    const handleProfileImage=(e)=>{
        setProfileImage(e.target.files[0]);
    }

    const registerUser = async()=>{
        try {
            const formData=new FormData();
            formData.append("fullName",user.fullName);
            formData.append("email",user.email);
            formData.append("password",user.password);
            formData.append("phoneNumber",user.phoneNumber);
            formData.append("profileImage",profileImage);

            await api.post("/users/register",formData);
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <>
            <div className="fixed inset-0 bg-surface backdrop-blur-sm z-40" ></div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 lg:w-xl md:w-lg">
                    <Stepper
                        initialStep={1}
                        onStepChange={(step) => {
                        console.log(step);
                        }}
                        onFinalStepCompleted={()=>registerUser()}
                        backButtonText="Previous"
                        nextButtonText="Next"
                    >
                        <Step>
                            <p className="text-3xl text-center text-accent underline underline-offset-2 mb-6">Sign Up</p>
                            <div className="flex gap-2 items-center mb-4">
                                <p className="text-accent">Name:</p>
                                <input type="text" onChange={handleFullName} placeholder="Enter your name" className="w-1/2 p-2 border border-accent rounded-lg"/>
                            </div>
                            <div className="flex gap-2 items-center mb-4">
                                <p className="text-accent">Password:</p>
                                <input type="password" onChange={handlePassword} placeholder="Enter your password" className="w-1/2 p-2 border border-accent rounded-lg"/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">Phone Number:</p>
                                <input type="number" onChange={handlePhoneNumber} placeholder="Enter your phone number" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                            <Link to={"/login"}>
                                <p className="text-accent text-center mt-5 underline underline-offset-2 text-xl hover:text-blue-400 cursor-pointer">Already have a account? Login..</p>
                            </Link>
                        </Step>
                        <Step>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">Email:</p>
                                <input type="email" onChange={handleEmail} placeholder="Enter your Email ID" className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="text-accent">Profile Image:</p>
                                <input type="file" onChange={handleProfileImage} className="w-3/4 p-2 border border-accent rounded-lg mb-0.5"/>
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