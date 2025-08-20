import client from "./api.js";

export const loginUser = (email, password) => {
    return client.get("/UserLogin", {
        params: { email, password }
    });
};

export const registerUser = (userData) => {
    return client.post("/UserRegistration", userData);
};

export const forgotPassword = (email) => {
    return client.post("/ForgotPassword", { email })
        .then(res => {
            console.log(res.data);
            return res.data;
        });
};

export const resetPassword = (token, newPassword) => {
    return client.post("/reset-password", { token, newPassword });
};

export const loginAdmin = (email, password) => {
    return client.post("/LoginAdmin", { email, password });
};
