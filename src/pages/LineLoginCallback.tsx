import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkState from "../api/line/checkState";
import authToProfile from "../api/line/exchangeAccessToken";

const LineLoginCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const authorizationCode = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');
    const navigate = useNavigate();

    // debug LINE things
    const [authCode, setAuthCode] = useState("");
    const [lineId, setLineId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        if(!state)
        {
            navigate("/line/access");
            return;
        }
        checkState(state).then((success) => {
            if(!success)
            {
                alert("LINE Login processing failed. Please try again.");
                navigate("/line/access");
                return;
            }
        })
        if(error)
        {
            alert(`
                LINE Login authorization failed: ${error}
                ${error_description}
                `)
            navigate("/line/access");
            return;
        }
        if(!authorizationCode)
        {
            alert(`Did not obtain authorization code from LINE Login.`);
            navigate("/line/access");
            return;
        }

        setAuthCode(authorizationCode);
        const thisUrl = `https://splendid-sheep-wrongly.ngrok-free.app/line/callback`;

        // Chain exchangeAccessToken and getProfile
        authToProfile(authorizationCode, thisUrl).then((profile) => {
            if(profile) {
                setLineId(profile.userId);
                setDisplayName(profile.displayName);
                setPictureUrl(profile.pictureUrl);
                setStatusMessage(profile.statusMessage ?? "None");
            }
        });

    }, []);

    return (
        <>
            <div className="container">
                <h1>Auth</h1>
                <p>Auth Code: {authCode}</p>
                <h1>Access</h1>
                <p>(Omitted)</p>
                <h1>Profile</h1>
                <p>Line ID: {lineId}</p>
                <p>Display Name: {displayName}</p>
                <p>Picture URL: {pictureUrl}</p>
                <p>Status Message: {statusMessage}</p>
            </div>
        </>
    )
}

export default LineLoginCallback;