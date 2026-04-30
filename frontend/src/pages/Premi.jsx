import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getPremi} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.jsx";

export default function Premi ()  {
    const [premi, setPremi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {logout} = useAuth();

    useEffect(()=>{
        async function load(){

        const res = await getPremi();
        if (res.unauthorized) {
            logout();
            return ;
        }
        if(!res.success){
            setError(res.message||"Errore nel caricamento dei premi");
            setLoading(false);
            return ;
        }
        setPremi(res.premi||[]);
        setLoading(false);
    }//fine load
    load();
    },[]);
    if(loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>Premi</h1>
            {error&&<p className="error">{error}</p>}
            {premi.length===0 && <p>Nessun premio disponibile</p>}
            {premi.map((p)=>{
                <div key={p.id_Premio} className="mission-card">
                    <h2>{p.titolo}</h2>
                    {p.immagine && (
                        <img
                            src={'http://localhost/GreenLoop/backend/php/uploads/${p.immagine}'}
                            alt="Premio"
                            style={{
                                width: "100%",
                                borderRadius: "8px",
                                marginTop: "10px",
                                objectFit: "cover"
                            }}
                        />
                    )}
                <p>{p.descrizione}</p>
                <p><strong>Punti richiesti: </strong>{p.punti}</p>
                <Link to={'/premi/${p.id_Premio}'}>
                    <button>Riscatta</button>
                </Link>
                </div>
            })}
        </div>
    );

} //Fine