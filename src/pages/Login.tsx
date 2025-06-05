const Login = () => {
    return (
        <>
            <div className="navbar-blank"></div>
            <div className="container">
                <h1>Login Page</h1>
                <p>Enter full name to log in.</p>
                <form>
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