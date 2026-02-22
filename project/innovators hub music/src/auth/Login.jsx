import React, { useContext, useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Spinner from '../helpers/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContextAPI } from '../Context/AuthContext';
import { __AUTH } from '../backend/FirebaseConfig'

const Login = () => {
  let [togglePassword, setTogglePassword] = useState(false)
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  let [isLoading,setIsLoading]=useState(false)


  let{email,password}=data;
  let navigate=useNavigate()
  let{setAuthUser}=useContext(AuthContextAPI)
  


  let handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }
  let handleSubmit=async (e)=>{
    e.preventDefault()
    try {
      setIsLoading(true)
      let obj=await signInWithEmailAndPassword(__AUTH,email,password)
      // console.log(obj);
      let {user}=obj
      console.log(user);
      
      
      if(user.emailVerified === true){
        toast.success("Login successful")
        setAuthUser(user)
        navigate("/")

      }else{
        toast.error("Verify your email")
        sendEmailVerification(user)
        
        
      }
    } catch (error) {
      toast.error(error.message.slice(22,error.message.length-2))
      
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div>
       <section className=" h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
      <div className=" w-[30%] p-4 bg-slate-600 rounded-md">
        <header className="text-center text-3xl text-white">
          <h1>Login</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-md  text-white" htmlFor="">
                Email:
              </label>
              <input
                className="outline-none border-1 rounded-md w-[100%] py-1 my-1 pl-2 text-white"
                id="email"
                placeholder="Enter your valid email"
                type="email"
                onChange={handlechange}
                name="email"
                value={email}
              />
            </div>
            <div className="relative">
              <label className="block text-md  text-white" htmlFor="">
                Password:
              </label>
              <input
                className="outline-none border-1 rounded-md w-[100%] py-1 my-1 pl-2 text-white"
                id="password"
                placeholder="Enter your password"
                type={togglePassword ? "text" : "password"}
                onChange={handlechange}
                name="password"
                value={password}
              />
              {togglePassword ?(
              <FaEye
                className="absolute top-9.5 right-3 text-white hover:cursor-pointer "
                onClick={() => setTogglePassword(!togglePassword)}
              />
            ):(
                <FaEyeSlash
                className="absolute top-9.5 right-3 text-white hover:cursor-pointer"
                onClick={() => setTogglePassword(!togglePassword)}
                />

            )}

            </div>
           
            <div className="flex justify-center">
              <button className="bg-blue-900 text-white hover:bg-blue-600 rounded-md  w-[100%] font-semibold py-1 my-1 pl-2 pr-2 pt-1 hover:cursor-pointer">
                Login
              </button>
            </div>
            <div className="mt-2 text-center">
                <span>Already have an account ?</span>
                <NavLink to="/auth/register" className="text-red-800">register</NavLink>

            </div>
            <div className="mt-2 text-center">
                
                <NavLink to="/auth/Forgetpassword" className="text-red-800">ForgetPassword?</NavLink>

            </div>

          </form>
        </main>
      </div>
      {isLoading && <Spinner/>}
    </section>

    </div>
  )
}

export default Login