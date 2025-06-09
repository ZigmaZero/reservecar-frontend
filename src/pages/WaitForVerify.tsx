import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

const WaitForVerify = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.verified) {
            navigate("/menu");
        }
    }, [user, navigate]);

    return (
        <>
        <div className="navbar-blank"></div>
        <div className = "container">
            <h1>Wait for Verification</h1>
            <p>Your registration request is being processed. Please wait for verification.</p>
        </div>
        </>
    )
}
export default WaitForVerify;