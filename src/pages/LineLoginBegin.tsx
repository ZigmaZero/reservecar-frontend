import React, { useEffect } from "react"
import getState from "../api/line/getState";
import { useSearchParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import Navbar from "../widgets/Navbar";

const LineLoginBegin: React.FC = () => {

    const [searchParams] = useSearchParams();
    const action = searchParams.get('action');
    
    const URI = "https://access.line.me/oauth2/v2.1/authorize"
    const CLIENT_ID = import.meta.env.VITE_LINE_CLIENT_ID as string;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;
    const SCOPE = "profile%20openid";

    useEffect(() => {
        getState().then((state) => {
            let redirectUriWithAction = REDIRECT_URI;
            if (action === "checkin" || action === "checkout") {
                // Append ?action=checkin or ?action=checkout
                const separator = '?';
                redirectUriWithAction = `${REDIRECT_URI}${separator}action=${action}`;
            }
            const loginUrl = `${URI}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUriWithAction)}&state=${state}&scope=${SCOPE}`;
            window.location.href = loginUrl;
        });
    }, [action, REDIRECT_URI, CLIENT_ID, URI, SCOPE])

    return (
        <>
            <Navbar showButtons={false} />
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box textAlign="center">
                    <Typography variant="body1">
                        Redirecting to LINE Login...
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default LineLoginBegin;