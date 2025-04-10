export const getusers = async () => {
    try {
        const response = await fetch(`http://localhost:3000/users`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const loggin = async (email, password) => {
    try {
        const response = await fetch(`http://localhost:3000/auth/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 👈 important to include cookies!
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data; // ✅ Now actually returning the response
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
};
