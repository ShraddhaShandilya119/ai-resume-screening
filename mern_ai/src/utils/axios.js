import axios from "axios";

const instance = axios.create({
    baseURL: "https://ai-resume-screening-0p6n.onrender.com",
    withCredentials: true
   
});

export default instance;