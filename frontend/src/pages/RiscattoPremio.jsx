import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {getPremio, riscattaPremio} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.jsx";
import "../styles/button.css";
export default function RiscattoPremio(){
    const {id} = useParams();
    const navigate = useNavigate();
    const {logout} = useAuth();

    const [premio, setPremio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(()=>{
        async function load() {
            const res = await getPremio(id);
            if(res.unauthorized){
                logout();
                return ;
            }
            if(!res.success) {
                setError(res.message);
                setLoading(false);
                return ;
            }
            setPremio(res.premio);
            setLoading(false);
        }
        load();
    },[id]);
    async function handleRiscatto(){
        setProcessing(true);
        setError("");
        setSuccess("");

        const res = await riscattaPremio(id);
        setProcessing(false);
        if(res.unauthorized){
            logout();
            return ;
        }
        if(!res.success){
            setError(res.message||"Errore durante il riscatto");
            return ;
        }
        setSuccess("Prmeio riscattato con successo");
        setTimeout(()=>{
            navigate("/punti");
        },1500);
    }
    if (loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>{premio.titolo}</h1>
            {premio.immagine && (
                <img 
                src = {'http://localhost/GreenLoop/backend/php/uploads/${premio.immagine}'}
                alt="Premio"
                style={{
                    width: "100%",
                    borderRadius: "8px",
                    marginTop: "10px",
                    objectFit: "cover"
                }}
                />
            )}
            <p>{premio.descrizione}</p>
            <p><strong>Punti richiesti: </strong>{premio.punti}</p>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {processing ? (
                <div className="loader"></div>
            ): (
                <button className="btn-greenloop" onClick={handleRiscatto}>Conferma riscatto</button>
            )}
        </div>
    )
}