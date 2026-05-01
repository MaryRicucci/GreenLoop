import {useEffect, useState} from "react";
import {getStorico} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.jsx";

export default function Storico(){
    const [attivita, setAttivita] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {logout} = useAuth();
    useEffect(()=>{
        async function load() {
            const res = await getStorico();
            if(res.unauthorized){
                logout();
                return ;
            }
            if(!res.success){
                setError(res.message||"Errore nel caricamento dello storico");
                setLoading(false);
                return ;
            }
            setAttivita(res.storico||[]);
            setLoading(false);
        }
        if(loading) return <div className="loader"></div>
        return (
            <div className="container">
                <h1>Storico attivitù</h1>
                {error && <p className="error">{error}</p>}
                {attivita.length===0 && <p>Nessuna attività registrata</p>}
                {attivita.map((a,i)=>{
                    <div key={i} className="mission-card">
                        <h2>{a.titolo}</h2>
                        <p><strong>Tipo attività</strong>{a.tipo}</p>
                        <p><strong>Data: </strong>{""}{new Date(a.data).toLocalDateString("it-IT")}</p>
                        <p><strong>Punti: </strong>{""}{a.punti>0 ? '+${a.punti}': a.punti}</p>
                        {a.foto && (
                            <img
                            src={'http://localhost/GreenLoop/backend/php/uploads/${a.foto}'}
                            alt = "Foto attività"
                            style={{
                                width: "100%" ,
                                borderRadius: "8px",
                                marginTop: "10px",
                                objectFit: "cover"
                            }}
                            />
                        )}
                    </div>
                })}
            </div>
        )
    });
}