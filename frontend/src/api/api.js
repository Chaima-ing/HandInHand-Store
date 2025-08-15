import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080", // replace when you know
    headers: {
        "Content-Type": "application/json"
    }
});
