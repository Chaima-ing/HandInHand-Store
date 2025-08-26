export const loginUser = async ({ email, password }) => {
    // Mock login: only accepts specific email & password
    if (email === "test@test.com" && password === "123456") {
        return {
            data: {
                success: true,
                token: "mock-jwt-token-12345", // <-- add this
                user: { id: 1, name: "Mock User", email }
            }
        };
    } else {
        return {
            data: {
                success: false,
                message: "Invalid email or password"
            }
        };
    }
};

export const registerUser = async ({ name, email, password }) => {
    // Always succeeds (you can add validation if needed)
    return {
        data: {
            success: true,
            user: { id: 2, name, email }
        }
    };
};
