import React, { useContext, useState } from "react";
import { AuthContextAPI } from "../../Context/AuthContext";
import { __DB } from "../../backend/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { UserContextAPI } from "../../context/userContext";


const UpdateProfile = ()=>{
let {authUser}=useContext(AuthContextAPI)
let {UserProfile}=useContext(UserContextAPI)
let [data, setData] = useState({
phoneNo: UserProfile?.phoneNumber, 
dob: UserProfile?.dateOfBirth, 
languages: UserProfile?.languages, 
gender: UserProfile?.gender,
address: UserProfile?.address,

  });
  let { phoneNo, dob, language, gender, address } = data;

  let handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setData({ ...data, [key]: value });
  };

  let handleSubmit =async (e) => {
    e.preventDefault();
    let {displayName,email,photoURL,uid}=authUser
    let payload={
      name:displayName,
      email:email,
      photo:photoURL,
      id:uid,
      phoneNumber:phoneNo,
      dateOfBirth:dob,
      gender:gender,
      language:language,
      address:address,
      role:"user"


    }
    try {
        console.log(payload);
        let user_collection=doc(__DB,"UpdateProfile",uid)
        await setDoc(user_collection,payload)
      
    //   let user_collection=doc(__DB,"user_profile")
    //  await setDoc(user_collection,payload)
    toast.success("Profile Data  Added Successfully")

    } catch (error) {
      toast.error(error.message)

    }
  };
  return (
    <section className="text-white h-[100%] w-[100%]   flex items-center justify-center">
      <article className="min-h-[450px] w-[60%] bg-black rounded-xl p-4">
        <h2 className="text-white text-center text-2xl">Upload profile Data</h2>
        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <article className="flex gap-5 ">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor='"PhoneNo' className="block text-[18px] ">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phondNo"
                placeholder="Enter phone number"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="phoneNo"
                value={phoneNo}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="DOB" className="block text-[18px] ">
                Date of birth:
              </label>
              <input
                type="date"
                id="DOB"
                placeholder="Enter Date of birth"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="dob"
                value={dob}
              />
            </div>
          </article>
          <article className="flex gap-6 ">
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="Language" className="block text-[18px] ">
                Language:
              </label>
              <input
                type="text"
                id="Language"
                placeholder="Enter your Language"
                className="outline-none bg-white py-2 px-4 rounded-lg text-black"
                onChange={handleChange}
                name="language"
                value={language}
              />
            </div>
            <div className=" flex flex-col gap-4 w-[48%]">
              <label htmlFor="" className="block text-[18px] ">
                Gender :
              </label>
              <div className="flex  gap-4">
                <input
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  value="Male"
                />
                <span>Male</span>
                <input
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  value="Female"
                />
                <span>female</span>
                <input
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  value="Others"
                />
                <span>Others</span>
              </div>
            </div>
          </article>
          <article className="flex gap-5 ">
            <div className="flex flex-col gap-2 w-[100%]">
              <label htmlFor="Address" className="block text-[18px] ">
                Address:
              </label>
              <textarea
                type="text"
                id="address"
                placeholder="Enter your valid address"
                className="outline-none rounded-lg bg-white py-2 px-2 text-black"
                onChange={handleChange}
                name="address"
                value={address}
              ></textarea>
            </div>
          </article>
          <div className="w-[100%] flex justify-center py-3 px-2 bg-blue-600 rounded-lg mt-2 cursor-pointer hover:bg-blue-500">
            <button className="text-center cursor-pointer">Upload Data</button>
          </div>
        </form>
      </article>
    </section>
  );
};

export default UpdateProfile;