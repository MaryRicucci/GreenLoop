const express = require ('express');
const app = express ();
const cookieParser = require ('cookie-parser');
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
const upload = multer();
const base = "http://localhost/GreenLoop/backend-php";
//Mancano i middleware
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true 
}));
//Route handler

//POST register
app.post("/register",async (req,res)=>{    
    
    const response = await fetch(base+"/register.php",{
        method : "POST",
        headers : {
            "Content-Type": "application/json"},
        body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
});

//POST login
app.post("/login", async(req,res)=>{
    const response = await fetch (base+"/login.php",{
        method : "POST" ,
        headers : {
            "Content-Type" : "application/json",
            cookie : req.headers.cookie || "" 
        },
        body : JSON.stringify(req.body)
        });
    const data = await response.json();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) res.setHeader("set-cookie", setCookie);
    res.json(data);
});

//Get profile
app.get("/me",async(req,res)=>{
    const response = await fetch(base+"/profile.php",{
        method : "GET" ,
        headers : {
            cookie : req.headers.cookie || ""
        }
    });
    const data = await response.json();
    res.json(data);
});
//GET /missioni
app.get("/missioni",async(req,res)=>{
    const response = await fetch(base+"/getMissioni.php",{
        method: "GET",
        headers : {
            cookie : req.headers.cookie || "" 
        }
    });
    const data = await response.json();
    res.json(data);
});
//GET /missioni/completate
app.get("/missioni/completate",async(req,res)=>{
    const response = await fetch (base+"/getMissioniUtente.php",{
        method : "GET" ,
        headers : {
            cookie : req.headers.cookie || ""
        }
    });
    const data = await response.json();
    res.json(data);
});
//POST /missioni/completa
app.post("/missioni/completa",uplpad.single("foto"),async (req,res)=>{
    try {
        const formData = new FormData(); //obj per inviare il file + dati a php
        formData.append("id_Missione",req.body.id_Missione); //Dato testuale

        //Foto in file 
        formData.append(
            "foto",
            new Blob ([req.filter.Buffer]), //Trasforma il file binario (buffer) in file vero
            req.filter.originalname
        );
        const response = await fetch(base+"/completaMissione.php",{
            method : "POST",
            headers : {
                cookie : req.headers.cookie || "" 
            },
            body : formData
        });
        const data = await response.json();
        res.json(data);
    }
    catch(error) {
        console.error(error);
        res.status(500).json({success: false ,message: "Errore del server"});
    }
});
//POST logout
app.post("/logout",async(req,res)=>{
    const response = await fetch(base+"/logout.php",{
        method : "POST ",
        headers : {
            cookie : req.headers.cookie || ""
        }
    });
    const data = await response.json();
    const setCookie = response.headers.get("set-cookie");
    if(setCookie) {
        res.setHeader("set-cookie",setCookie);
    }
    res.json(data);
})
app.listen(3000,()=>{
    console.log("Connessione aperta sulla porta 3000");
});