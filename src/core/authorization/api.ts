// Login user call
export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('http://localhost:8086/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Authentication failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during authentication:', error);
    }
};

// Register user call
export const registerUser = async (
    username: string,
    email: string,
    password: string
) => {
    try {
        const response = await fetch('http://localhost:8086/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during registration:', error);
    }
}