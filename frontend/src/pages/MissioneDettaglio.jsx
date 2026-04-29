import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMissione} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
const navigate = useNavigate();
export default function MissioneDettaglio(){
    const {id} = useParams();
    const [missione, setMissione] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(true);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const {logout} = useAuth();

    useEffect(()=>{
        async function load(){
            const res = await getMissione(id);

            if(req.unauthorized){
                logout();
                return ;
            }
            setMissione(res.missione);
            seLoading(false);
        }
        load();
    },[id]);

    async function handleUpload(){
        if(!file){
            setError("Seleziona una foto prima di caricare");
            return ;
        }
        setUploading(true);
        setError("");
        setSuccess("");
        const res = await uploadFoto(id,file);
        setUploading = false ;
        if(res.unauthorized){
            logout();
            return ;
        }
        if(res.success){
            setError(res.message||"Errore durante l'upload");
            return ;
        }
        setSuccess("Foto caricata con successo");
        setTimeout(()=>{
            navigate("/missioni/completate");
        },1500);
    }


    if(loading) return <div className="loader"></div>
    return (
        <div className="container">
            <h1>{missione.titolo}</h1>
            <p><strong>Descrizione: </strong>{missione.descrizioneComplta}</p>
            <p><strong>Punti: </strong>{missione.punti}</p>
            <p>
                <strong>Istruzioni: </strong><br />
                {missione.istruzioni}
            </p>
            <p>
                <strong>Stato: </strong>{""}
                {missione.completata ? "Completata" : "Da completare"}
            </p>
            <h2>Carica foto</h2>
            <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files[0])}/>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            {uploading ? (
                <div className="loader"></div>
            ): (
                <button onClick={handleUpload}>Carica foto</button>
            )}
        </div>
    );
}