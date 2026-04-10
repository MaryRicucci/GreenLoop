const express = require ('express');
const app = express ();
app.use(express.json());

//Mancano i middleware

//Route handler

//POST register
app.post("/register",async(req,res)=>{    
    
    const response = await fetch("http://localhost/GreenLoop/backend-php/register.php",{
        method : "POST",
        headers : {
            "Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(200).json(data);
});


app.listen(3000,()=>{
    console.log("Connessione aperta sulla porta 3000");
});