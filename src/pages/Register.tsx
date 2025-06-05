import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Register = () => {
    const [searchParams] = useSearchParams();
    const action = searchParams.get('action');
    const navigate = useNavigate();
    const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;

        axios.post('/register', {
            fullName: username
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(`User registered successfully.`);
                if(action)
                {
                    navigate(`/login?action=${action}`); // Redirect to login page with action
                }
                else
                {
                    navigate('/login'); // Redirect to login page
                }
            } else {
                console.error(`Unexpected response status: ${response.status}`);
                alert("An error occurred. Please try again later.");
            }
        })
        .catch((error) => {
            if (error.response) {
                console.error(`Error during registration: ${error.response.status} - ${error.response.data.error}`);
            } else {
                console.error('Error during registration:', error.message);
            }
            alert("An error occurred. Please try again later.");
        });
    };
    return (
        <>
        <div className="navbar-blank"></div>
        <div className="container">
            <h1>Register Page</h1>
            <p>You are not registered with the system.</p>
            <p>In the current version, just entering full name is enough.</p>
            <form onSubmit = {registerUser}>
                <label htmlFor="username">Full Name:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
}
export default Register;