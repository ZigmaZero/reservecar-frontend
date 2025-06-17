import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Container, Box, Typography } from "@mui/material";
import Navbar from "../widgets/Navbar";

const LineLogin: React.FC = () => {
    const [searchParams] = useSearchParams();
    const action = searchParams.get('action');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (action === "checkin" || action === "checkout") {
            navigate(`/line/begin?action=${action}`);
        } else {
            navigate("/line/begin");
        }
    };

    return (
        <>
            <Navbar showButtons={false} />
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Welcome to Jastel ReserveCar Service!
                    </Typography>
                    <Button
                        id="line-login"
                        onClick={handleLogin}
                        variant="contained"
                        sx={{
                            backgroundColor: "#00C300",
                            color: "#fff",
                            textTransform: "none",
                            fontSize: "16px",
                            padding: "10px 24px",
                            borderRadius: "4px",
                            boxShadow: 2,
                            mt: 3,
                            '&:hover': {
                                backgroundColor: "#00a300"
                            }
                        }}
                        startIcon={
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                                alt="LINE"
                                style={{
                                    width: 24,
                                    height: 24,
                                    background: "#fff",
                                    borderRadius: "50%"
                                }}
                            />
                        }
                    >
                        Login with LINE
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default LineLogin;