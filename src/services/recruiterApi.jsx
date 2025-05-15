import axios from "axios";
// Create API instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth    
});

const recruiterCompanyProfile = async (formData, loggedUser) => {
    try {
        const { data } = await api.post('/recruiter/company-profile', { formData, user: loggedUser });
        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('Upload error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
};

const getCompanyProfile = async (user) => {
    try {
        const { data } = await api.post('/recruiter/get-company-profile', { user });
        return {
            status: data.status,
            message: data.message,
            profile: data.profile
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
};

const updateCompanyProfile = async (formData) => {
    try {
        const { data } = await api.post('/recruiter/update-company-profile', { formData });
        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('error:', error.message);
        return {
            status: false,
            message: error.message,
        };
    }
};

const BACKEND_API = { recruiterCompanyProfile, getCompanyProfile, updateCompanyProfile }

export default BACKEND_API;