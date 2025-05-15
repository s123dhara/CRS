import axios from "axios";
// Create API instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth    
});


const viewApplicationDetails = async (job_id) => {
    try {
        const { data } = await api.get(`/application/view-applicants/${job_id}`);
        return {
            status: data.status,
            message: data.message,
            applicants: data.applicants,
            jobname : data.jobname
        }
    } catch (error) {
        return {
            status: false,
        }
    }
}


const BACKEND_API = { viewApplicationDetails };

export default BACKEND_API;