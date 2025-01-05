import axios from "axios";

const apiBaseURL = process.env.REACT_APP_API_URL;

const apiRequest = axios.create({
    baseURL: apiBaseURL,
    withCredentials:true,
    headers: { "Content-Type": "application/json" },
})

console.log("apiURL: ", apiBaseURL)

export default apiRequest;

/* How to use: Example
const options = {
            method: "POST",
            url: "/mylist",    
            data: {
                num: 10,
                id: userId
            }
        }
const response = await apiRequest(options);

const images: SavedImageData[] = response.data;

*/