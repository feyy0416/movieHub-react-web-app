import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './index.css';

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const login = async () => {
    try {
      await client.login(credentials);
      navigate("/Moviehub/Profile");
    } catch (error) {
      setError("Incorrect username or password");
      console.error("Login error:", error);
    }

  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const BASE_API = process.env.REACT_APP_API_BASE;
        const response = await fetch(`${BASE_API}/api/users/check-login`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include credentials to send cookies with the request
        });

        if (response.ok) { //indicates whether the HTTP response status falls within the range of 200-299
          const result = await response.json();
          setIsLoggedIn(result.isLoggedIn);
        } else {
          console.error('Failed to check login status:', response.status);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    checkLogin();
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <p className="fw-bold fs-2 mt-5" style={{ textAlign: "center", color: "#808080" }}>You have already logged in, Enjoy!</p>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "500px" }}>
        <h2 style={{ textAlign: "center", color: "#808080" }}>Login</h2>
        {error && <p className="w-100 rounded-pill mt-2 mb-2" style={{ textAlign: "center", backgroundColor: "#FFCCCB", color: "red", margin: "0 auto" }}>{error}</p>}
        <input className="form-control" placeholder="username" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
        <input type="password" className="form-control mt-2" placeholder="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        <button className="btn btn-outline-secondary mt-2 w-100" onClick={login}> Login </button>
        <Link to="/Moviehub/Signup" className="btn btn-outline-secondary w-100 mt-2">
          Go to Sign up Page
        </Link>
      </div>
    </div>
  );
}
export default Login;