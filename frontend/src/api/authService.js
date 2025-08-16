import client from "./api.js"

export const loginUser = (id, password) => {
    return client.post("/UserLogin", {
        params: {id,password}
    });
};

export const registerUser = (userData) => {
    return client.post("/UserRegister", userData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
};

export const forgotPassword = (email) => {
    return client.post("/ForgotPassword", {email})
        .then(res => {
            console.log(res.data);
        });
};

export const resetPassword = (token, newPassword) => {
    return client.post(`/reset-password`, { token, newPassword });
};
