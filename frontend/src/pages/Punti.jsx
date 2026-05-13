import {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth.jsx";
import {getMe} from "../api/api.js";
import "../styles/button.css";
export default function Punti() {
    const [utente, setUtente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const {logout} = useAuth();

    useEffect(()=>{
        async function load () {
            const res = await getMe();
            if(res.unauthorized){
                logout();
                return ;
            }
            if(!res.success) {
                setError(res.message||"Errore nel caricamento dei punti");
                setLoading(false);
                return ;
            }
            setUtente(res.utente);
            setLoading(false);
        }
        load();
    },[]);
    if (loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>I tuoi punti</h1>
            {error && <p className="error">{error}</p>}
            {utente && (
                <div className="mission-card">
                    <p><strong>Punti totale: </strong>{utente.punti_totali}</p>
                    <p><strong>Punti guadagnati: </strong>{utente.punti_guadagnati}</p>
                    <p><strong>Putni spesi: </strong>{utente.punti_spesi}</p>
                    <Link to="/storico">
                    <button className="btn-greenloop">Vedi storico attività</button></Link>
                </div>
            )}
        </div>
    )
}