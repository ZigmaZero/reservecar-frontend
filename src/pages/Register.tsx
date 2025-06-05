const Register = () => {

    const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;

        // Here you would typically send the username to your backend for registration
        console.log(`Registering user: ${username}`);
        
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