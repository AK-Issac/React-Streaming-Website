import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();

    const handleLogin = async () => {
        setError("");
        try {
            const response = await fetch("https://tvshowdbapi.herokuapp.com/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const data = await response.json();
            setAuthToken(data.token);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container" role="form" aria-labelledby="loginHeading">
            <h2 id="loginHeading">Connexion</h2>
            <div className="section">
                <div className="content">
                    <div className="field">
                        <label className="label" htmlFor="emailInput">Email</label>
                        <div className="control has-icons-left">
                            <input
                                id="emailInput"
                                className="input"
                                type="email"
                                placeholder="e1234567@site.com"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-required="true"
                            />
                            <span className="icon is-small is-left" aria-hidden="true">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="passwordInput">Password</label>
                        <div className="control has-icons-left">
                            <input
                                id="passwordInput"
                                className="input"
                                type="password"
                                placeholder="*******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-required="true"
                            />
                            <span className="icon is-small is-left" aria-hidden="true">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        {error && <p className="help is-danger" role="alert">{error}</p>}
                        <div className="control">
                            <button className="button is-success" onClick={handleLogin}>Connexion</button>
                            <button className="button is-danger" onClick={handleCancel}>Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
