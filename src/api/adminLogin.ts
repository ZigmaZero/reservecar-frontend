import axios from 'axios';
import type { AdminExternal } from './externalTypes';

export default function adminLogin(name: string, password: string): Promise<{
    admin: AdminExternal;
    token: string;
}> {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) 
    {
        throw new Error("Backend URL not found in environment variables");
    }

    return axios.post(`/admin/login`, {
        name,
        password
    })
    .then((response) => {
        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        } else {
            console.log(`Welcome ${name}`);
            return {
                admin: response.data.admin,
                token: response.data.token
            }
        }
    })
    .catch((error) => {
        if (error.response && error.response.status !== 400 && error.response.status !== 401) {
            throw new Error(`Unexpected error status:, error.response.status, error.response.data`);
        }
        else
            throw error;
    });
}