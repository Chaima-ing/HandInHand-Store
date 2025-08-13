import api from "./api.js"

export const loginUser = (id, password) => {
    return api.get("/UserLogin", {
        params: {id,password}
    });
};

export const registerUser = (userData) => {
    return api.post("/UserRegister", userData);
};