export const SystemConfig = () => {
    const BACKEND_URL = import.meta.env.MODE === 'production'
        ? '' // your production backend URL (can be set here)
        : 'http://localhost:3000/';

    return { BACKEND_URL };
};
