import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const CheckoutSuccess = () => {
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
    return (
        <div className="container">
            <h1>Checkout Success!</h1>
            <p>Thank you for using the system.</p>
            <p>Please come again.</p>
        </div>
    )
}

export default CheckoutSuccess;