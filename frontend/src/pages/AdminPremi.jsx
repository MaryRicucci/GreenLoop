import { useEffect, useState } from "react";
import { adminGetPremi, adminCreaPremio, adminEliminaPremio } from "../../api/api.js";
import "../styles/button.css";
export default function AdminPremi() {
  const [premi, setPremi] = useState([]);
  const [titolo, setTitolo] = useState("");
  const [descrizione, setDescrizione] = useState("");

  async function load() {
    const res = await adminGetPremi();
    if (res.success) setPremi(res.premi);
  }

  useEffect(() => { load(); }, []);

  async function crea() {
    await adminCreaPremio({ titolo, descrizione });
    load();
  }

  async function elimina(id) {
    await adminEliminaPremio(id);
    load();
  }

  return (
    <div className="container">
      <h1>Gestione Premi</h1>

      <div className="form">
        <input placeholder="Titolo" onChange={e => setTitolo(e.target.value)} />
        <input placeholder="Descrizione" onChange={e => setDescrizione(e.target.value)} />
        <button className="btn-greenloop" onClick={crea}>Crea Premio</button>
      </div>

      {premi.map(p => (
        <div key={p.id_Premio} className="card">
          <h3>{p.titolo}</h3>
          <p>{p.descrizione}</p>
          <button className="btn-greenloop" onClick={() => elimina(p.id_Premio)} className="danger">Elimina</button>
        </div>
      ))}
    </div>
  );
}
