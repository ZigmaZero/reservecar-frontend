import type React from "react";
import { useNavigate } from "react-router-dom";

const LineLogin: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <p>Welcome to Jastel ReserveCar Service!</p>
                <button
                    id="line-login"
                    onClick={() => { navigate("/line/begin"); }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#00C300",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                        alt="LINE"
                        style={{ width: "24px", height: "24px", marginRight: "8px", background: "#fff", borderRadius: "50%" }}
                    />
                    Login with LINE
                </button>
            </div>
        </>
    )
}

export default LineLogin;