import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkState from "../api/line/checkState";
import exchangeAccessToken from "../api/line/exchangeAccessToken";
import getProfile from "../api/line/getProfile";

const LineLoginCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const authorizationCode = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');
    const navigate = useNavigate();

    // debug LINE things
    const [authCode, setAuthCode] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [expiresIn, setExpiresIn] = useState(0);
    const [scope, setScope] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
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
        exchangeAccessToken(authorizationCode, thisUrl).then((data) => {
            if(data) {
                setAccessToken(data.access_token);
                setExpiresIn(data.expires_in);
                setScope(data.scope);
                setRefreshToken(data.refresh_token);

                // Now fetch profile with the access token
                return getProfile(data.access_token);
            } else {
                alert("Token exchange failed.");
                return undefined;
            }
        }).then((profile) => {
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
                <p>Access Token: {accessToken}</p>
                <p>Expires In: {expiresIn}</p>
                <p>Refresh Token: {refreshToken}</p>
                <p>Scope: {scope}</p>
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