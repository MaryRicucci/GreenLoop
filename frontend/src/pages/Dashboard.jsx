import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dati, setDati] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    async function fetchDati() {
      try {
        const res = await fetch("http://localhost:3000/utente/me", {
          credentials: "include"
        });

        if (res.status === 401) {
          logout(); // sessione scaduta → logout automatico
          return;
        }
8
        const data = await res.json();
        setDati(data.user);
        setLoading(false);

      } catch (err) {
        console.log("Errore:", err);
      }
    }

    fetchDati();
  }, []);

  if (loading) return <div className="loader"></div>;

  return (
    <div>
      <h1>Benvenuto, {dati.nome}!</h1>

      <h2>Punti attuali: {dati.punti}</h2>

      <div style={{ marginTop: "20px" }}>
        <h3>Missioni completate: {dati.missioniCompletate}</h3>
        <h3>Premi riscattati: {dati.premiRiscattati}</h3>
      </div>

      <hr />

      <h2>Link rapidi</h2>
      <ul>
        <li><Link to="/missioni">Missioni</Link></li>
        <li><Link to="/premi">Premi</Link></li>
        <li><Link to="/storico">Storico</Link></li>
      </ul>
    </div>
  );
}
