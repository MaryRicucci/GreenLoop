import {useEffect,useState} from "react";
import { adminGetMissioni, adminCreaMissione, adminEliminaMissione } from "../api/api";
import "../styles/button.css";
export default function AdminMissioni(){
    const [missioni, setMissioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [titolo, setTitolo] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [punti, setPunti] = useState("");

    async function load () {
        const res = await adminGetMissioni();
        if(!res.success){
            setError(res.message);
            setLoading(false);
            return ;
        }
        setMissioni(res.missioni);
        setLoading(false);
    }
    useEffect(()=>{
        load();
    },[]);
    async function crea(){
        const res = await adminCreaMissione({titolo, descrizione, punti});
        if (!res.success){
            setError(res.message);
        }
        setTitolo("");
        setDescrizione("");
        load();
    }
    async function elimina(id){
        const res = await adminEliminaMission(id);
        if(!res.success){
            setError(res.message);
            return ;
        }
        load();
    }
    if(loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>Gestione missioni</h1>
            {error && <p className="error">{error}</p>}
            <div className="mission-card">
                <h2>Crea nuova missione</h2>
                <input placeholder="Titolo" value={titolo} onChange={e=>setTitolo(e.target.value)}></input>
                <textarea placeholder="Descrizione" value={descrizione} onChange={e=>setDescrizione(e.target.value)}/>
                <input placeholder="Punti" type="number" value={punti} onChange={e=>setPunti(e.target.value)}/>
                <button className="btn-GreenLoop" onClick={crea}>Crea missione</button>
            </div>
            <h2>Missioni esistenti</h2>
            {missioni.map(m=>(
                <div key={m.id} className="mission-card">
                    <h3>{m.titolo}</h3>
                    <p>{m.descrizione}</p>
                    <p><strong>Punti: </strong>{m.punti}</p>
                    <button className="btn-GreenLoop"onClick={()=> elimina(m.id)}>Elimina</button>
                </div>
            ))}
        </div>
    );
}
