const express = require ('express');
const app = express ();
const cookieParser = require ('cookie-parser');
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
const multer = require ("multer");
const upload = multer();
const formData = require("form-data");
const base = "http://localhost/GreenLoop/backend/php";
//ELIMINARE LA CARTELLA MIDDLEWARE
//Middleware
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true 
}));
//Input pericolosi
app.use((req,res,next)=>{
    const sanitaze = (value) => {
        if (typeof value === "string"){
            return value 
                       .replace(/<script.*?>.*?</script>/gi, "")
                       .replace(/[<>]/g, "")
                       .trim();
    }
        return value ;
    };
    for (const key of req.body) {
      req.body[key] = sanitaze(req.body[key]);
    }
    next();
});
//Validazione body
app.use((req,res,next)=>{
    if (req.method === "POST" && !req.body) {
        return res.json({
            success : false ,
            message : "Body mancante o non valido"
        });
    next();
});
import { rateLimit} from 'express-rate-limit' ;
//Rate limiter
const limiter = rateLimit({
    windowMs : 20*60*1000 ,
    limit : 3 , 
    message : {
        success : false ,
        message : "Troppe richieste. Riprova più tardi" } ,
    standardHeaders : true ,
    legacyHeaders: false ,
});  
app.use("/login" , limiter);
app.use("/pagamenti/crea", limiter);
app.use("/missioni/completa", limiter);
//Route handler

//POST register
app.post("/register",async (req,res)=>{    
    
    const response = await fetch(base+"/authentication/register.php",{
        method : "POST",
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams(req.body)
    });
    const data = await response.json();
    res.json(data);
});

//POST login
app.post("/login", async(req,res)=>{
    const response = await fetch (base+"/authentication/login.php",{
        method : "POST" ,
        headers : {
            "Content-Type" : "application/x-www-urlencoded",
            cookie : req.headers.cookie || "" 
        },
        body : new URLSearchParams(req.body)
        });
    const data = await response.json();
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) res.setHeader("set-cookie", setCookie);
    res.json(data);
});

//Get profile
app.get("/me",async(req,res)=>{
    const response = await fetch(base+"/authentication/profile.php",{
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
    const response = await fetch(base+"/missions/getMissioni.php",{
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
    const response = await fetch (base+"/missions/getMissioniUtente.php",{
        method : "GET" ,
        headers : {
            cookie : req.headers.cookie || ""
        }
    });
    const data = await response.json();
    res.json(data);
});
//POST /missioni/completa
app.post("/missioni/completa",upload.single("foto"),async (req,res)=>{
    try {
        const formData = new FormData(); //obj per inviare il file + dati a php
        formData.append("id_Missione",req.body.id_Missione); //Dato testuale

        //Foto in file 
        formData.append(
            "foto",
            req.file.buffer,
            req.file.originalname
        );
        const response = await fetch(base+"/missions/completaMissione.php",{
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
//GET /premi
app.get("/premi",async(req,res)=>{
    const response = await fetch(base+"/rewards/getPremi.php",{
        method : "GET" ,
        headers : {
            cookie : req.headers.cookie || "" 
        }
    });
    const data = await response.json();
    res.json(data);
});
//POST /premi/riscatta
app.post("/premi/riscatta",async(req,res)=>{
    const response = await fetch (base+"/rewards/riscattaPremio.php",{
        method : "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            cookie : req.headers.cookie || "" 
        },
        body : new URLSearchParams(req.body)
    });
    const data = await response.json();
    res.json(data);
});
//Get /storico
app.get("/storico",async (req,res)=>{
    const response = await fetch (base+"/getStorico.php",{
        method : "GET" ,
        header : {
            cookie : req.headers.cookie || " "
        }
    })
    const data = await response.json();
    res.json(data);
});
//POST /pagamenti crea
app.post("/pagamenti/crea",async(req,res)=>{
    const response = await fetch(base+"/payments/CreaPagamento.php",{
        method : "POST" ,
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded" ,
            cookie : req.headers.cookie || "" 
        },
        body : new URLSearchParams(req.body)};
   const data = await response.json();
    res.json(data);
});
//POST logout
app.post("/logout",async(req,res)=>{
    const response = await fetch(base+"/authentication/logout.php",{
        method : "POST",
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
});
app.listen(3000,()=>{
    console.log("Connessione aperta sulla porta 3000");
});
