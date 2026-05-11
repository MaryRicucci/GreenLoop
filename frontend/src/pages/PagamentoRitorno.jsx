import { useEffect, useState } from "react";

export default function PagamentoRitorno() {
  const [stato, setStato] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    fetch("http://localhost:3000/pagamenti/verifica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId })
    })
      .then(res => res.json())
      .then(data => setStato(data.stato))
      .catch(() => setStato("ERRORE"));
  }, []);

  if (!stato) return <p>Verifica in corso...</p>;

  return (
    <div>
      {stato === "COMPLETED" ? (
        <h3>Pagamento ricevuto!</h3>
      ) : (
        <h3>Pagamento non riuscito</h3>
      )}
    </div>
  );
}
