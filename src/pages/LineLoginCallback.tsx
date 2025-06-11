import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkState from "../api/line/checkState";
import exchangeAccessToken from "../api/line/exchangeAccessToken";

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

    useEffect(() => {
        if(!state)
        {
            // did not get accessed via LINE: redirect to LineLogin
            navigate("/line/access");
            return;
        }
        checkState(state).then((success) => {
            if(!success)
            {
                // LINE login did not return a valid state
                alert("LINE Login processing failed. Please try again.");
                navigate("/line/access");
                return;
            }
        })
        // state is guaranteed to be valid
        if(error)
        {
            // LINE Login returned an auth error
            alert(`
                LINE Login authorization failed: ${error}
                ${error_description}
                `)
            navigate("/line/access");
            return;
        }
        //did not error
        if(!authorizationCode)
        {
            alert(`Did not obtain authorization code from LINE Login. Contact developer/maintainer.`);
            navigate("/line/access");
            return;
        }

        //stop to validate the process by showing auth code
        setAuthCode(authorizationCode);
        const thisUrl = `https://splendid-sheep-wrongly.ngrok-free.app/line/callback`
        //auth code is received and valid, send the auth code back to backend
        //to have them query line for access token
        exchangeAccessToken(authorizationCode, thisUrl).then((data) => {
            if(data)
            {
                setAccessToken(data.access_token);
                setExpiresIn(data.expires_in);
                setScope(data.scope);
                setRefreshToken(data.refresh_token);
            }
            else
            {
                alert("Token exchange failed.")
            }
        })

        //then user information,
        //then EITHER fetches old user information or just returns line id,
        //at which point this either enters /menu with old user information 
        //or opens a register page with the line id.

        //since i don't want to send line id on search params,
        //i have to implement the register page again on this page
        //and then deprecate /register and /login
    }, [])

    return (
        <>
            <div className="container">
                <p>Auth Code: {authCode}</p>
                <p>Access Token: {accessToken}</p>
                <p>Expires In: {expiresIn}</p>
                <p>Refresh Token: {refreshToken}</p>
                <p>Scope: {scope}</p>
            </div>
        </>
    )
}

export default LineLoginCallback;