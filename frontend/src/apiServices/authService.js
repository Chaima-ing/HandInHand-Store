import client from "./api.js"

export const loginUser = (id, password) => {
    return client.post("/UserLogin",{id,password});
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

export const loginAdmin = (email, password) => {
    return client.post("/LoginAdmin", {email, password});
}

export const verifyCode = (code,email) => {
    try {
        const res = client.post("/VerifyCode", { code, email });
        return res.data; // return backend response { success: true/false, message }
    } catch (error) {
        // optional: normalize error message
        return { success: false, message: error.response?.data?.message || "Server error" };
    }
}