import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMissione} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.jsx";

export default function MissioneDettaglio(){
    const {id} = useParams();
    const [missione, setMissione] = useState(null);
    const [loading, setLoading] = useState(true);
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
            <button>Carica foto</button>
        </div>
    );
}