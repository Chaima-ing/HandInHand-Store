import api from "./api.js"

export const loginUser = (email, password) => {
    return api.get("/UserLogin", {
        params: {email,password}
    });
};

export const registerUser = (userData) => {
    return api.post("/UserRegistration", userData);
};

export const forgotPassword = (email) => {
    return api.post("/ForgotPassword", {email});
};

export const resetPassword = (token, newPassword) => {
    return api.post(`/reset-password`, { token, newPassword });
};
