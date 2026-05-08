import {useEffect, useState} from "react";
import { admimGetMissioniDaValidare, adminApprovaMissione, adminRifiutaMissione } from "../api/api";

export default function AdminValidazioni() {
    const [missioni, setMissioni] = useState([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        const res = await adminGetMissioniDaValidare();
        if(res.success) setMissioni(res.missioni);
        setLoading(false);
    }
    useEffect(()=>{
        load();
    },[]);
    async function approva(id){
        await adminApprovaMissione(id);
        load();
    }
    async function rifiuta(id) {
        await adminRifiutaMission(id);
        load();
    }
    if(loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>Validazione Missioni</h1>
            {missioni.length===0&&<p>Nessuna missione da validate</p>}
            {missioni.map(m=>{
                <div key={m.id} className="mission-card">
                    <h3>{m.titolo}</h3>
                    <p>{m.descrizione}</p>
                    <p><strong>Punti: </strong>{m.punti}</p>
                    <img src={m.foto} alt="prova" className="mission-img"/>

                    <div className="btn-row"> 
                        <button onclick={()=>approva(m.id)}>Approva</button>
                        <button onclick={()=>rifiuta(m.id)} className="danger">Rifiuta</button>
                    </div>
                </div>
            })}
        </div>
    )
}