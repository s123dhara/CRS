import { useAuth } from "../context/AuthContext";

const { updateAccessToken, getAccessTokenFromContext } = useAuth();

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // so cookies are sent
});

api.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (err.response.status === 401 && !err.config._retry) {
            err.config._retry = true;

            try {
                const { data } = await api.post('/auth/check');
                // Update access token in context
                updateAccessToken(data.accessToken);
                err.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                return api(err.config);
            } catch (refreshErr) {
                return Promise.reject(refreshErr);
            }
        }
        return Promise.reject(err);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = getAccessTokenFromContext();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


export default api;
