const SystemConfig = () => {
    const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT || 5000;
    const BACKEND_URI = import.meta.env.VITE_MODE === 'production' ? '' : `http://localhost:${BACKEND_PORT}/`;

    return { BACKEND_URI };
};

export default SystemConfig;