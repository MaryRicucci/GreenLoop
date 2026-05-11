const params = new URLSearchParams(window.location.search);
const orderId = params.get("orderId");

async function verificaPagamento() {
  const response = await fetch("http://localhost:3000/pagamenti/verifica", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId })
  });

  const data = await response.json();

  if (data.stato === "COMPLETED") {
    document.getElementById("risultato").innerHTML = `
      <h3>Pagamento ricevuto!</h3>
      <a href="/pages/profilo.html">Torna al profilo</a>
    `;
  } else {
    document.getElementById("risultato").innerHTML = `
      <h3>Pagamento non riuscito</h3>
      <a href="/pages/riscatta.html">Riprova</a>
    `;
  }
}

verificaPagamento();
