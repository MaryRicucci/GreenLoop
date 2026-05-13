import { useState } from "react";
import { adminLogin } from "../../api/api.js";
import "../styles/button.css";
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await adminLogin(email, password);

    if (!res.success) {
      setError("Credenziali non valide");
      return;
    }

    localStorage.setItem("adminToken", res.token);
    window.location.href = "/admin/dashboard";
  }

  return (
    <div className="login-container">
      <h1>Admin Login</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email admin"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn-greenloop" type="submit">Accedi</button>
      </form>
    </div>
  );
}
