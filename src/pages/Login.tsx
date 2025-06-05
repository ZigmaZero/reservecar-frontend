import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const action = searchParams.get('action');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;

        // Send login request to the backend
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName: username }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login, e.g., redirect to dashboard
            console.log('Login successful.');
            if(!data.verified) {
                navigate('/verify');
            }
            else if(action === 'checkin' || action === 'checkout') {
                navigate(`/${action}`);
            }
            else {
                navigate('/menu');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        });
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