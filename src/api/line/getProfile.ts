import axios from "axios";
import type { LineProfile } from "../internalTypes";

export default function getProfile(access_token: string): Promise<LineProfile | undefined> {
    return axios.get(`/line/access?access_token=${access_token}`).then((response) => {
        if(response.status !== 200)
        {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        return response.data as LineProfile;
    }).catch((error) => {
        console.error("Unexpected error status:", error.response.status, error.response.data);
        throw new Error("An unexpected error occurred. Please try again later.");
    })
}