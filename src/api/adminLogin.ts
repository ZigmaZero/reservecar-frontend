import axios from 'axios';

export default function adminLogin(name: string, password: string): Promise<string> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) 
    {
        throw new Error("Backend URL not found in environment variables");
    }

    return axios.post(`${backendUrl}/admin/login`, {
        name,
        password
    })
    .then((response) => {
        if (response.data && response.data.token) {
            return response.data.token; // Return the token from the response
        } else {
            throw new Error("Token not found in response");
        }
    })
    .catch((error) => {
        if (error.response && error.response.status !== 400 && error.response.status !== 401) {
            console.error("Unexpected error status:", error.response.status, error.response.data);
        }
        else
            throw error;
    });
}