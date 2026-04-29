import { useEffect, useState } from "react";
import { getMissioniCompletate } from "../api/api.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function MissioniCompletate() {
  const [missioni, setMissioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    async function load() {
      const res = await getMissioniCompletate();

      if (res.unauthorized) {
        logout();
        return;
      }
      setMissioni(res.missioni || []);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <div className="loader"></div>;

  return (
    <div className="container">
      <h1>Missioni completate</h1>

      {missioni.length === 0 && <p>Nessuna missione completata.</p>}

      {missioni.map((m) => (
        <div key={m.id_Missione} className="mission-card">
          <h2>{m.titolo}</h2>

          {m.foto && (
            <img
              src={`http://localhost/GreenLoop/backend/php/uploads/${m.foto}`}
              alt="Foto missione"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginTop: "10px",
                objectFit: "cover"
              }}
            />
          )}

          <p><strong>Punti ottenuti:</strong> {m.punti}</p>

          <p>
            <strong>Completata il:</strong>{" "}
            {new Date(m.data_completamento).toLocaleDateString("it-IT")}
          </p>
        </div>
      ))}
    </div>
  );
}
