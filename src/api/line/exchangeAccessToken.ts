import axios from "axios";
import type { LineAuthCodeResponse } from "../internalTypes";

export default async function exchangeAccessToken(code: string, redirect_uri: string): Promise<LineAuthCodeResponse | undefined> {
    return axios.post(`/line/auth`, {code, redirect_uri}).then((response) => {
        return response.data as LineAuthCodeResponse;
    }).catch((error) => {
        console.error("Internal server error:", error.response.status, error.response.data);
        throw new Error("An unexpected error occurred. Please try again later.");
    })
}