import {useState, useEffect} from "react";
import "../styles/button.css";
export default function RiscattaDenaro() {
    const [metodo, setMetodo] = useState("");
    const [importo, setImporto] = useState(0);
    const [errore, setErrore] = useState("");
    useEffect(()=>{
        fetch("http://localhost:3000/utente/saldo")
        .then(res=> res.json())
        .then(data=> setImporto(data.saldo))
        .catch(()=>setErrore("Errore nel caricamento del saldo"))
    },[]);
    async function riscatta() {
        if(!metodo) {
            setErrore("Seleziona un metodo");
            return ;
        }
        const response = await fetch("http://localhost:3000/pagamenti/crea",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                amount: importo,
                metodo 
            })
        });
        const data = await response.json();
        if(!data.success)  {
            setErrore(data.errore);
            return;
        }
        window.location.href = data.redirectUrl;
    }
    return (
        <div>
            <h2>Riscatta denaro</h2>
            <p>Importo disponibile: {importo} €</p>
            <label>
                <input
                type = "radio"
                name="metodo"
                value="paypal"
                onChange={e=>setMetodo(e.target.value)}
                />
                Ricevi con Paypal
            </label>
            <label>
                <input 
                type="radio" 
                name="metodo"
                value="satispay"
                onChange={e=>setMetodo(e.target.value)}
                />
                Ricevi con Satispay
            </label>
            <button className="btn-greenloop" onClick={riscatta}>Ricevi denaro</button>
            {errore && <p style={{color: "red"}}>{errore}</p>}
        </div>
    );
}