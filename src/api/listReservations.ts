import axios from 'axios';
import type { Reservation } from './types';

export default function listReservations(currentPage: number, pageSize: number, token: string): Promise<{
    data: Reservation[];
    total: number;
    page: number;
    pageSize: number;
    maxPages: number;
}> {
    return axios.get(`/reservations`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            params: {
                page: currentPage,
                pageSize: pageSize,
            },
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
            return response.data;
        })
        .catch((error) => {
            if(error.response && error.response.status !== 400 && error.response.status !== 401) {
                console.error("Unexpected error status:", error.response.status, error.response.data);
                throw new Error("An unexpected error occurred. Please try again later.");
            }
            else {
                throw error;
            }
        })
}