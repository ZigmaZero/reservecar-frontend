import { useNavigate, useSearchParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import userLogin from "../api/user/userLogin";

const Login = () => {
    const [searchParams] = useSearchParams();
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();
    const action = searchParams.get('action');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;

        try {
            userLogin(username).then((response) => {
                setUser(response.user);
                setToken(response.token);
                if(!response.user.verified) {
                    navigate('/verify');
                }
                else if (action === 'checkin') {
                    navigate('/checkin');
                } else if (action === 'checkout') {
                    navigate('/checkout');
                } else {
                    navigate('/menu');
                }
            }).catch((error) => {
                console.error("Login failed:", error);
                alert("Login failed. Please try again.");
            });
        }
        catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <>
            <div className="navbar-blank"></div>
            <div className="container">
                <h1>Login Page</h1>
                <p>Enter full name to log in.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Full Name:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}
export default Login;