import React, { useEffect } from "react"
import getState from "../api/line/getState";

const LineLoginBegin: React.FC = () => {

    const URI = "https://access.line.me/oauth2/v2.1/authorize"
    const CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
    const SCOPE = "profile%20openid";

    useEffect(() => {
        getState().then((state) => {
            const loginUrl = `${URI}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${SCOPE}`;
            window.location.href = loginUrl;
        });
        
    }, [])

    return (
        <>
            <div className="container">
                <p>Redirecting to LINE Login...</p>
            </div>
        </>
    )
}

export default LineLoginBegin;