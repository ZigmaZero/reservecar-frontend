import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminLogin from "../api/adminLogin";
import { useAdmin } from "../contexts/AdminContext";

const AdminLogin = () => {
  const { admin, setAdmin, setToken } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // if is admin, redirect to dashboard
  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, [admin])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // login API
    adminLogin(username, password)
      .then((data) => {
        setAdmin(data.admin);
        setToken(data.token);
        console.log(`Welcome ${admin?.name}`)
      })
      .catch((error) => {
        if (error.response && error.response.status !== 400 && error.response.status !== 401) {
          console.error("Unexpected error status:", error.response.status, error.response.data);
          alert("An unexpected error occurred. Please try again later.");
        }
        else
        {
          alert("Username or password is incorrect.");
        }
      })
  };

  return (
    <div className="admin-container">
      <h1>Admin Page</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
