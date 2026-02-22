import React, { useState } from 'react'
import Spinner from '../helpers/Spinner';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { __AUTH } from '../backend/FirebaseConfig';

    const Forgetpassword = () => {
    let [isLoading,setIsLoading]=useState(false)
    let navigate=useNavigate()
    let[email,setemail]=useState("")
    const handlechange=(e)=>{
    setemail(e.target.value)
    }
    let handleSubmit= async(e)=>{
        e.preventDefault()
        try{
            await sendPasswordResetEmail(__AUTH,email)
            toast.success("reset link send")
            navigate("/auth/login")
        }catch{
            toast.success(error.message)

        }
    }
  return (
    <div>
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
              <div className="flex justify-center">
              <button className="bg-blue-900 text-white hover:bg-blue-600 rounded-md  w-[100%] font-semibold py-1 my-1 pl-2 pr-2 pt-1 hover:cursor-pointer">
                      Reset Password
              </button>
              </div>
              <div className="mt-2 text-center">
              <span></span>
              <NavLink to="/auth/Login" className="text-white bg-red-700 w-[100%] font-semibold hover:bg-red-500 block py-1 rounded-lg">Cancel</NavLink>
      
              </div>
                
              </form>
              </main>
              </div>
             {isLoading && <Spinner/>}
              </section>
              </div>
        
      
    </div>
  )
}

export default Forgetpassword

