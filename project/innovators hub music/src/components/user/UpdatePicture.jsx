import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContextAPI } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "../../helpers/Spinner";

const UpdatePicture = () => {
  let { authUser } = useContext(AuthContextAPI);
  let [picture, setPicture] = useState(null);
  let [preview, setPreview] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const handleChange = (e) => {
    let file = e.target.files[0];
    setPicture(file);

    if (file) {
      let url = URL.createObjectURL(file);
      console.log(url);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!picture) {
        toast.error("Select a photo");
      } else {
        const data = new FormData();
        data.append("file", picture);
        data.append("upload_preset", "innovator-hub-music1");

        let response = await fetch(
          "https://api.cloudinary.com/v1_1/denofamnb/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        let result = await response.json();
        console.log(result);

        await updateProfile(authUser, {
          photoURL: result.url,
        });
        toast.success("Photo Updated");
        navigate("/user-profile");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-[100%] w-[100%] flex items-center justify-center">
      <article className="min-h-[300px] w-[40%] bg-black rounded-xl p-4 ">
        <h2 className="text-white text-center text-2xl">
          Upload profile picture
        </h2>
        <div className="w-32 h-32 m-auto bg-gray-700 rounded-full">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-[100%] w-[100%] rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center h-[100%] w-[100%] rounded-full">
              No file selected
            </div>
          )}
        </div>
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <label
            htmlFor="picture"
            className="text-white block py-2 w-[100%] text-center rounded-lg border-2 border-dotted cursor-pointer"
            accept="image/*"
          >
            Select a Photo
          </label>
          <input
            type="file"
            id="picture"
            className="hidden"
            onChange={handleChange}
            name="picture"
          />
          <button
            type="submit"
            className="py-2 w-[100%] bg-blue-600 rounded-lg cursor-pointer text-center"
          >
            Upload Photo
          </button>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default UpdatePicture;
