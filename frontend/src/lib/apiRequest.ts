import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_URL;

const apiRequest = axios.create({
    baseURL: apiBaseURL,
    withCredentials:true,
    headers: { "Content-Type": "application/json" },
})

console.log("apiURL: ", apiBaseURL)

export default apiRequest;