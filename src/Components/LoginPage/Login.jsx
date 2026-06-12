import Stepper , {Step} from "../UI/Stepper";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/apiClient";
function Login(){
  const [user,setUser]=useState({
    email:"",
    password:""
  });

  const handleEmail=(e)=>{
    setUser(prev=>({...prev,email:e.target.value}))
  }
  const handlePassword=(e)=>{
    setUser(prev=>({...prev,password:e.target.value}))
  }

  const handleLogin = async()=>{
    try {
      const response = await api.post("/users/login",user);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="fixed inset-0 bg-surface backdrop-blur-sm z-40" ></div>
  
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 lg:w-xl md:w-lg">
        <Stepper
          initialStep={1}
          onStepChange={(step) => {
            console.log(step);
          }}
          onFinalStepCompleted={()=>handleLogin()}
          backButtonText="Previous"
          nextButtonText="Next"
        >
          <Step>
            <p className="text-center text-accent text-3xl mb-2 underline underline-offset-2">Login</p>

            <div className="flex flex-col items-center gap-2">
              <input type="email" placeholder="Enter Email ID" onChange={handleEmail} className="border w-3/4 p-2 rounded-lg border-accent"/>
              <input type="password" placeholder="Enter Password" onChange={handlePassword} className="border w-3/4 p-2 rounded-lg border-accent"/>
            </div>
            <Link to={"/signup"}>
              <p className="text-accent text-center mt-5 underline underline-offset-2 text-xl hover:text-blue-400 cursor-pointer">New User? Create Account...</p>
            </Link>
          </Step>
          <Step>
            <p className="text-accent text-center text-2xl">Complete Login by clicking <span className="text-green-500">Complete</span></p>
          </Step>
        </Stepper>
      </div>
    </>
  )
}

export default Login