import axios from "axios";
// Create API instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth    
});


const usersAdd = async (credentials) => {
    try {
        const result = await api.post('/users/add', credentials);
        return { status: true, data: result.data };
    } catch (e) {
        if (e.response && e.response.data) {
            return { status: false, data: e.response.data };
        }
        return { status: false, data: { message: "Something went wrong. Please try again." } };
    }
};

const fetchAllUsers = async (token) => {
    try {
        const result = await api.get('/users', {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return { status: true, users : result.data.data};
    } catch (error) {
        if(error.response && e.response.data) {
            return {status : false, data : e.response.data}
        }
    }
}

const BACKEND_API = { usersAdd , fetchAllUsers};

export default BACKEND_API;