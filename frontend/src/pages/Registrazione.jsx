import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registrazione() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function validaEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // VALIDAZIONE
    if (!nome || !email || !pw || !pw2) {
      setError("Compila tutti i campi");
      return;
    }

    if (!validaEmail(email)) {
      setError("Email non valida");
      return;
    }

    if (pw !== pw2) {
      setError("Le password non coincidono");
      return;
    }

    // CHIAMATA POST
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          nome,
          email,
          password: pw
        })
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Errore durante la registrazione");
        return;
      }

      // REGISTRAZIONE OK → REDIRECT
      navigate("/login");

    } catch (err) {
      setError("Errore di connessione");
    }
  }

  return (
    <div>
      <h1>Registrazione</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

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

        <input
          type="password"
          placeholder="Conferma password"
          value={pw2}
          onChange={e => setPw2(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Registrati</button>
      </form>
    </div>
  );
}