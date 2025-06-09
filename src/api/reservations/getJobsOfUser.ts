import axios from 'axios';
import type { ReservationExternal } from '../externalTypes';

export default function getJobsOfUser(token: string): Promise<ReservationExternal[]> {
    return axios.get(`/user/reservations`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    }).then((response) => {
        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        return response.data.reservations
            .map((reservation: any) => ({
                id: reservation.reservationId,
                carId: reservation.carId,
                description: reservation.description,
                checkinTime: reservation.checkinTime,
                checkoutTime: reservation.checkoutTime,
            })) as ReservationExternal[];
    }
    ).catch((error) => {
        if (error.response && error.response.status !== 400 && error.response.status !== 401) {
            console.error("Unexpected error status:", error.response.status, error.response.data);
            throw new Error("An unexpected error occurred. Please try again later.");
        } else {
            throw error;
        }
    }
    );
}