import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { __DB } from "../backend/FirebaseConfig";
import { AuthContextAPI } from "./AuthContext";
export let UserContextAPI = createContext();

let UserProvider = (props) => {
    let { authUser } = useContext(AuthContextAPI);
    let [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        let fetchProfile = () => {
            let user_collection = doc(__DB, "UpdateProfile", authUser?.uid);
            onSnapshot(user_collection, (data) => {
                // console.log(data.data());
                setUserProfile(data.data()); 

            });
        };
        if (authUser) {
            fetchProfile();
        }
    }, [authUser]);

    return <UserContextAPI.Provider value={{ userProfile }}>
            {props.children}
        </UserContextAPI.Provider>
    
};

// export { UserContextAPI, UserProvider };
export default UserProvider;