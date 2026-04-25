import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getMissioni} from "../api/api.js";
import {useAuth} from "../hooks/useAuth.js";

export default function Missioni() {
    const [missioni, setMissioni] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout } = useAuth();

    useEffect(()=>{
        async function load(){
            const res = await getMissioni();

            if(res.unauthorized){
                logout();
                return ;
            }

            setMissioni(res.missioni || []);
            setLoading(false);
        }

        load()

    }, []);

    if(loading) return <div ClassName="loader"></div>

    return (
        <div className="container">
            <h1>Missioni</h1>
            {missioni.length===0 &&<p>Nessuna missione disponibile</p>}
            {missioni.map((m)=>(
                <div key={m.id} className="mission-card">
                    <h2>{m.titolo}</h2>
                    <p>{m.descrizioneBreve}</p>
                    <p><strong>Punti: </strong>{m.punti}</p>
                    <p><strong>Stato: </strong>{" "}
                    {m.completata ? "Completata" : "Da completare"}</p>

                    <Link to={'/missioni/${m.id}'}>
                    <button>Dettagli</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}