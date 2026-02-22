import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { __AUTH } from "../backend/FirebaseConfig";
import { NavLink, useNavigate, } from "react-router-dom";
import Spinner from "../helpers/Spinner";


const Register = () => {
  let [togglePassword, setTogglePassword] = useState(false);
  let[toggleConfirmPassword,setToggleConfirmPassword]=useState(false)
  let[isloading,stateisloading]=useState()
  let[data,setData]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })
  let{username,email,password,confirmPassword}=data;
  let navigate=useNavigate()
  let handlechange=(e)=>{
    let value=e.target.value
    let key=e.target.name
    setData({...data,[key]:value})
  }
  let handleSubmit=async (e)=>{
    e.preventDefault()
    try {
        if(password!==confirmPassword){
            toast.error("Confirm Pssword does not match")
            setData({...data,confirmPassword:""})
        }
        else{
           let obj= await createUserWithEmailAndPassword(__AUTH,email,password)
           let  {user}=obj
           console.log(user);
           updateProfile(user,{
            displayName:username,
            photoURL:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
           })
           sendEmailVerification(user)
           toast("verifivation link send")
           toast.success("registration successfull")
           Navigate("/auth/login")

           
        }
    } catch (error) {
        toast.error(error.message.slice(22,error.message.length-2))
        
    }  
  }
  return (
    <section className=" h-[calc(100vh-70px)] w-[100%] bg-slate-900 flex justify-center items-center">
      <div className=" w-[30%] p-4 bg-slate-700 rounded-md">
        <header className="text-center text-3xl text-white">
          <h1>Register</h1>
        </header>
        <main className="p-2">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label className="block text-md  text-white" htmlFor="">
                Username:
              </label>
              <input
                className="outline-none border-1 rounded-md w-[100%] py-1 my-1 pl-2 text-white"
                id="username"
                placeholder="Enter your username"
                type="text"
                onChange={handlechange}
                name="username"
                value={username}
              />
            </div>
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
            <div className="relative">
              <label className="block text-md  text-white" htmlFor="">
                Confirm Password
              </label>
              <input
                className="outline-none border-1 rounded-md w-[100%] py-1 my-1 pl-2 text-white"
                id="confirm password"
                placeholder="Re-enter your Password"
                type={toggleConfirmPassword ? "text" : "password"}
                onChange={handlechange}
                name="confirmPassword"
                value={confirmPassword}
              />
               {toggleConfirmPassword ?(
              <FaEye
                className="absolute top-9.5 right-3 text-white hover:cursor-pointer"
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
              />
            ):(
                <FaEyeSlash
                className="absolute top-9.5 right-3 text-white hover:cursor-pointer"
                onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
                />

            )}
            </div>
            <div className="flex justify-center">
              <button className="bg-blue-900 text-white hover:bg-blue-600 rounded-md  w-[100%] font-semibold py-1 my-1 pl-2 pr-2 pt-1 hover:cursor-pointer">
                Submit
              </button>
            </div>
            <div className="mt-2 text-center text-white">
          <span>Already account exist?</span>
          <NavLink to="/auth/login" className="text-red-600">login</NavLink>

            </div>
          </form>
        </main> 
      </div>
      {/* <Spinner/> */}
    </section>
  );
};

export default Register;
