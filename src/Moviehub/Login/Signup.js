import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/MovieHub/Profile");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="ms-2" style={{ width: "500px" }}>
            <h2 style={{textAlign : "center", color : "#808080"}}>Signup</h2>
            {error && <p className="w-100 rounded-pill mt-2 mb-2" style={{ textAlign:"center", backgroundColor:"#FFCCCB", color: "red", margin: "0 auto" }}>{error}</p>}
                <input
                    className="form-control"
                    value={credentials.username}
                    placeholder="username"
                    onChange={(e) => setCredentials({
                        ...credentials,
                        username: e.target.value
                    })} />
                <input
                    className="form-control mt-2"
                    placeholder="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({
                        ...credentials,
                        password: e.target.value
                    })} />
                <button onClick={signup} className="btn btn-outline-secondary w-100 mt-2">
                    Signup
                </button>
            </div>
        </div>

    );
}
export default Signup;