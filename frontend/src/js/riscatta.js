document.getElementById("btnRiscata").addEventListener("click",async()=>{
    const metodo = document.querySelector("input[name='metodo']:checked");
    const importo = await caricaImporto() ;

    if(!metodo) {
        document.getElementById("errore").innerText = "Seleziona un metodo";
        return ;
    }
    const response = await fetch("http://localhost:3000/pagamenti/crea",{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            amount: importo,
            metodo: metodo.value 
        })
    });
    const data = await response.json();
    if(!data.success) {
        document.getElementById("errore").innerText = data.error ;
        return ; 
    }
    window.location.href = data.redirectUrl ;
});