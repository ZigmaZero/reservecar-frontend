import { useNavigate, useSearchParams } from 'react-router-dom';
import userRegister from '../api/userRegister';
import { useState } from 'react';

const Register = () => {
    const [searchParams] = useSearchParams();
    const action = searchParams.get('action');
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        try {
            await userRegister(username);
            if(action) {
                navigate(`/login?action=${action}`);
            } else {
                navigate('/login');
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <div className="navbar-blank"></div>
        <div className="container">
            <h1>Register Page</h1>
            <p>You are not registered with the system.</p>
            <p>In the current version, just entering full name is enough.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Full Name:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    required
                />

                <button type="submit" disabled={isSubmitting}>Register</button>
            </form>
        </div>
        </>
    )
}
export default Register;