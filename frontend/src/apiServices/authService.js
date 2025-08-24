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
    return client.post("/forgot-password", { email })
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


export const verifyCode = (code,email) => {
    try {
        const res = client.post("/verify-code", { code, email });
        return res.data; // return backend response { success: true/false, message }
    } catch (error) {
        // optional: normalize error message
        return { success: false, message: error.response?.data?.message || "Server error" };
    }
}