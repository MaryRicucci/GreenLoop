import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/button.css";
export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // VALIDAZIONE
    if (!email || !pw) {
      setError("Compila tutti i campi");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email non valida");
      return;
    }

    // CHIAMATA POST
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          email,
          password: pw
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Credenziali errate");
        return;
      }

      // LOGIN OK
      login(data.user);

      navigate("/dashboard");

    } catch (err) {
      setError("Errore di connessione");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button className="btn-greenloop" type="submit">Accedi</button>
      </form>
    </div>
  );
}
