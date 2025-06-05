import axios from 'axios';

const Register = () => {

    const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;

        // register, then call login
        axios.post('/register', {
            fullName: username
        })
        .then((response) => {
            if (response.status === 201) {
                console.log(`User registered successfully.`);
                // After registration, you can redirect to login or dashboard
                window.location.href = '/login';
            } else {
                console.error(`Unexpected response status: ${response.status}`);
            }
        })
        .catch((error) => {
            if (error.response) {
                console.error(`Error during registration: ${error.response.status} - ${error.response.data.error}`);
            } else {
                console.error('Error during registration:', error.message);
            }
        });
        
        // Redirect or show success message after registration
    }
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