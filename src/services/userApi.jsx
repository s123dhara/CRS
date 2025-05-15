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
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return { status: true, users: result.data.data };
    } catch (error) {
        if (error.response && e.response.data) {
            return { status: false, data: e.response.data }
        }
    }
}

const getUserById = async (id, token) => {
    try {
        const result = await api.get(`/users/edit/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return { status: true, data: result.data.data };

    } catch (error) {

    }
}

const usersUpdate = async (id, updatedData, token) => {
    console.log(updatedData);

    try {
        const result = await api.post(`/users/${id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (result.status) {
            return { status: true, message: result.data.message };
        } else {
            return { status: false, message: result.data.message };
        }
    } catch (error) {
        return { status: false, message: "Something went wrong, Please try again later" };
    }
}

const deleteUserById = async (id, token) => {
    try {
        const result = await api.post(`/users/delete/${id}`, { userId: id }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (result.status) {
            return { status: true, message: result.data.message };
        } else {
            return { status: false, message: result.data.message };
        }
    } catch (error) {
        return { status: false, message: "Something went wrong, Please try again later" };
    }
};


const userSignup1 = async (email, password) => {
    console.log({ email, password });
    try {
        const { data } = await api.post(`/users/register`, { email, password });
        return {
            status: data.status,
            message: data.message
        };
    } catch (error) {
        console.error(error);

        let errorMessage = "Something went wrong, Please try again later";

        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }

        return {
            status: false,
            message: errorMessage
        };
    }
}

const userSignup = async ({ email, password }) => {
    try {
        const { data } = await api.post(`/auth/signup`, { email, password });
        return {
            status: data.status,
            message: data.message
        }
    } catch (error) {

    }
}


const userApplicationForm = async (formData, token) => {
    try {
        const { data } = await api.post('/users/apply/application-form', formData , {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {
            status: data.status,
            message: data.message,
        };
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
};



const BACKEND_API = { usersAdd, fetchAllUsers, getUserById, usersUpdate, deleteUserById, userSignup, userApplicationForm };

export default BACKEND_API;