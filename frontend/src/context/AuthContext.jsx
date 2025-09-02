import {createContext, useEffect, useState} from "react";
import {loginUser, registerUser} from "../apiServices/authService.js";
import client from "../apiServices/api.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogin = async (credentials) => {
        try {
            const response = await loginUser(credentials.email, credentials.password); // API call
            if (response.data === true) {
                // placeholder user
                const email = credentials.email;
                const user = { id: Date.now(), email }; // temporary id
                setUser(user);

                localStorage.setItem("userId", user.id); // ✅ match with useEffect
                localStorage.setItem("userEmail", email);

                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    };

    const handleRegister = async (credentials) => {
        try{
            const response = await registerUser(credentials);
            return response.data;
        }catch(error){
            return {success: false, message: error.response?.data?.message || "Register failed"};
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            client
                .get(`/getUserById?id=${userId}`)
                .then((res) => setUser(res.data))
                .catch((err) => console.log(err))
                .finally(() => setLoading(false)); // ✅ always stop loading
        } else {
            setLoading(false);
        }
    }, []);

    return (
      <AuthContext.Provider value={
          {
              user,
              isAuthenticated: !!user,
              loading,
              handleLogin,
              handleRegister,
          }
      }
      >
          {children}
      </AuthContext.Provider>
    );
};
export default AuthContext;
