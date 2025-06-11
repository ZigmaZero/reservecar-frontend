import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkState from "../api/line/checkState";
import authToProfile from "../api/line/exchangeAccessToken";
import userRegister from "../api/user/userRegister";
import { useUser } from "../contexts/UserContext";
import userLogin from "../api/user/userLogin";

const LineLoginCallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const { setUser, setToken } = useUser();
    const authorizationCode = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');
    const navigate = useNavigate();

    const [registered, setRegistered] = useState(true);

    // debug LINE things
    const [lineId, setLineId] = useState("");

    useEffect(() => {
        if(!state)
        {
            navigate("/line/access");
            return;
        }
        checkState(state).then((success) => {
            if(!success)
            {
                alert("LINE Login processing failed. Please try again.");
                navigate("/line/access");
                return;
            }
        })
        if(error)
        {
            alert(`
                LINE Login authorization failed: ${error}
                ${error_description}
                `)
            navigate("/line/access");
            return;
        }
        if(!authorizationCode)
        {
            alert(`Did not obtain authorization code from LINE Login.`);
            navigate("/line/access");
            return;
        }
        
        const thisUrl = `https://splendid-sheep-wrongly.ngrok-free.app/line/callback`;
        // Chain authToProfile and userLogin
        authToProfile(authorizationCode, thisUrl)
            .then((profile) => {
                if (profile) {
                    setLineId(profile.userId);
                    // Now try to log in with the obtained lineId
                    return userLogin(profile.userId);
                } else {
                    throw new Error("Failed to get LINE profile.");
                }
            })
            .then(({ user, token }) => {
                setUser(user);
                setToken(token);
                if (user.verified) {
                    navigate('/menu');
                } else {
                    navigate('/verify');
                }
            })
            .catch(() => {
                setRegistered(false);
            });
    }, []);

    // Register types
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        try {
            await userRegister(username, lineId);
            const {user, token} = await userLogin(lineId);
            setUser(user);
            setToken(token);
            navigate('/verify');
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        {registered ? 
            <div className="container">
                <p>Redirecting...</p>
            </div> 
            :
            <div className="container">
                <p>Line ID: {lineId}</p>
                <h1>Register Page</h1>
                <p>You are not registered with the system.</p>
                <p>Please enter your full name to register.</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Full Name:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                    />

                    <button type="submit" disabled={isSubmitting || !lineId}>Register</button>
                </form>
            </div>
        }  
        </>
    )
}

export default LineLoginCallback;