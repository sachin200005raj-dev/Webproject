import React, { useContext, useState } from 'react'
import { AuthContextAPI } from '../../Context/AuthContext'
import { NavLink } from 'react-router-dom'
import { UserContextAPI } from '../../context/userContext'

const UserAccount = () => {
  let {authUser}=useContext(AuthContextAPI)
  let {userProfile}=useContext(UserContextAPI)
  return (
    <section className='h-[100%] w-[100%]   flex items-center justify-center'>
      <article className='min-h-[300px] w-[40%] bg-black rounded-xl p-4'  >
<header className='h-[100px] w-[100%] bg-slate-900 rounded-t-xl flex flex-col items-center '>
<img src={authUser?.photoURL} alt="im"  className='h-25 w-25 rounded-full -mt-18'/>
<h2 className='text-white'>{authUser?.displayName}</h2>
<p className='text-white'>{authUser?.email}</p>
</header>
{userProfile ? <div className='mt-2'>
  <h2 className='text-xl text-indigo-600 text-center '>Personal Info </h2 >
  <article className='text-white flex flex-wrap gap-2'>
    <div className='w-[48%]  bg-slate-900 py-2 px-2 rounded-xl'>
      <h3 className='text-xl text-indigo-600  '>Phone Number</h3>
      <p>{userProfile?.phoneNumber}</p>
    </div>  
    <div className='w-[46%] bg-slate-900 py-2 px-2 rounded-xl'>
      <h3 className='text-xl text-indigo-600  '>Date of Birth</h3>
      <p>{userProfile?.dateOfBirth}</p>
    </div>
    <div className='w-[48%]  bg-slate-900 py-2 px-2 rounded-xl'>
      <h3 className='text-xl text-indigo-600  '>Languages</h3>
      <p>{userProfile?.language}</p>
    </div>
    <div className='w-[48%]  bg-slate-900 py-2 px-2 rounded-xl'>
      <h3 className='text-xl text-indigo-600  ' >Gender</h3>
      <p>{userProfile?.gender}</p>
    </div>
    <div className='w-[98%]  bg-slate-900 py-2 px-2 rounded-xl '>
      <h3 className='text-xl text-indigo-600  '>Address</h3>
      <p>{userProfile?.address}</p>
    </div>
  </article>
</div> : <>
<div className='h-[150px] w-[100%] flex items-center justify-center flex-col gap-4 '>
<h2 className='text-xl'>  User data not present</h2>
<NavLink to="update-profile" className='py-1 px-4 bg-blue-600 rounded-lg' >Add User data</NavLink>
</div> 
</>}
      </article>
    </section>
  )
}

export default UserAccount