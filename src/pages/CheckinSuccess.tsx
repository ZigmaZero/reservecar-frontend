import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";

const CheckinSuccess = () => {
    const { user, token } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user || !token) 
        {
            navigate("/line/access");
            return; // Prevent rendering if user is not logged in
        }
        else if (!user.verified) {
            navigate("/verify");
            return; // Prevent rendering if user is not verified
    }}, []);
    // If the user is logged in and verified, render the success message
    return (
        <div className="container">
            <h1>Checkin Success!</h1>
            <p>Thank you for checking in using the system.</p>
            <p>Please don't forget to checkout after you're done.</p>
            <div className="center">
                <button onClick={() => navigate("/checkout")}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}

export default CheckinSuccess;