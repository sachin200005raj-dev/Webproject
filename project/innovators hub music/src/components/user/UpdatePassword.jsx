import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import Spinner from '../../helpers/Spinner';
import { __AUTH } from "../../backend/FirebaseConfig";


const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(__AUTH, email);
            toast.success("Reset link sent to your email");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="h-[calc(100vh-70px)] w-[100%] flex justify-center items-center bg-slate-900">
            <div className="w-[40%] bg-black p-4 rounded-lg">
                <header>
                    <h1 className="text-center text-2xl font-semibold text-white">Update Password</h1>
                </header>
                <main className="p-2">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-lg text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="outline-none border w-full py-2 my-1 rounded-md pl-2"
                                onChange={handleChange}
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <button 
                                type="submit"
                                className="h-10 w-full text-white rounded-md font-semibold bg-blue-600 hover:bg-blue-600 transition"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Reset Password"}
                            </button>
                        </div>
                        <div className="mt-2 text-center">
                            <NavLink 
                                to="/auth/register" 
                                className=" bg-blue-600 text-white w-full block py-2 rounded-lg font-semibold hover:bg-blue-600  transition"
                            >
                                Cancel
                            </NavLink>
                        </div>
                    </form>
                </main>
            </div>
            {isLoading && <Spinner />}
        </section>
    );
};

export default UpdatePassword;