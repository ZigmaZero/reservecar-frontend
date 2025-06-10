import type React from "react";
import { useNavigate } from "react-router-dom";

const LineLogin: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <p>Welcome to Jastel ReserveCar Service!</p>
                <button onClick={() => {navigate("/line/begin")}}></button>
            </div>
        </>
    )
}

export default LineLogin;