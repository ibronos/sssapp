import { Navigate, Outlet  } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext<any>({});

const ProtectedRoute = () => {

    const [userData, setUserData] = useState({
        isLogin: false,
        token: undefined,
        user: undefined,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const checkLoggedIn = async () => {

            let token = localStorage.getItem("auth-token");
    
            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }

            try {
                await axios.post(`${import.meta.env.VITE_SERVER_HOST}/tokenisvalid`, 
                    null, 
                    { headers: {"x-auth-token" :token } }
                )
                .then(
                    response => {
                        // console.log(response.data);
                        if(response.data.success){
                            setUserData({
                                isLogin: true,
                                token: response.data.data.token,
                                user: response.data.data.user,
                            });
                        }
                    }
                )
                .catch((error) => {
                    throw new Error(error)
                })
                .finally(() => {
                    setLoading(false);
                });
            } 
            catch (error: any) {
                console.error(error);
            }

    
        };

        checkLoggedIn();
        
    }, []);


    if(loading) {
        return <p>loading..</p>;
    }
   
    return userData.isLogin ? 
        <UserContext.Provider value={userData}>
            <Outlet /> 
        </UserContext.Provider>
        : 
        <Navigate to="/signin" />;

};

export default ProtectedRoute;