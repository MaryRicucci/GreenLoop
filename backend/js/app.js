import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import FormData from "form-data";
import rateLimit from "express-rate-limit";

const app = express();
const upload = multer();
const base = "http://localhost/GreenLoop/backend/php";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//ELIMINARE LA CARTELLA MIDDLEWARE
//Middleware
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true 
}));
app.use((req,res,next)=>{
    const publicRoutes = [
        "/login" , "/register"
    ];
    if(publicRoutes.includes(req.path)){
        return next();
    }
    if (!req.headers.cookie){
        return res.json({
            success : false ,
            message : "Devi effettuare il login"
        });
    }
});

//Input pericolosi
app.use((req,res,next)=>{
    const sanitaze = (value) => {
        if (typeof value === "string"){
            return value 
                       .replace(/<script.*?>.*?<\/script>/gi, "")
                       .replace(/[<>]/g, "")
                       .trim();
    }
        return value ;
    };
    for (const key in req.body) {
      req.body[key] = sanitaze(req.body[key]);
    }
    next();
});
//Validazione body
app.use((req,res,next)=>{
    if (req.method === "POST" && Object.keys(req.body).length===0) {
        return res.json({
            success : false ,
            message : "Body mancante o non valido"
        });
    }    
    next();
});
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
app.use("/missioni",(req,res,next)=>{
    if(!req.headers.cookie){
        return res.json({
            success : false ,
            message : "Non sei autenticato"
        });
    }
    next();
});
app.use("/premi",(req,res,next)=>{
    if(!req.headers.cookie){
        return res.json({
            success : false ,
            message : "Non sei autenticato"
        });
    }
    next();
});
app.use("/storico",(req,res,next)=>{
        if(!req.headers.cookie){
            return res.json({success : false ,
            message : "Non sei autenticato"
        });
    }
    next();
});
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
    const response = await fetch(base+"/payments/creaPagamento.php",{
        method : "POST" ,
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded" ,
            cookie : req.headers.cookie || "" 
        },
        body : new URLSearchParams(req.body)
    });
   const data = await response.json();
    res.json(data);
});
//POST /pagamenti/verifica
app.post("/pagamenti/verifica",async(req,res)=>{
    try{
    if (!req.body.id_Pagamento){
        return res.json({
            success: false ,
            message : "ID pagamento mancante"
        });
    }
    const response = await fetch(base+"/payments/verificaPagamento.php",{
        method: "POST",
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded",
            cookie : req.headers.cookie || ""
        },
        body : new URLSearchParams({
            id_Pagamento : req.body.id_Pagamento
        })
    });
    const data = await response.json();
    return res.json(data);
}catch(error){
    console.error("Errore verifica pagamento: ", error);
    res.json({
        success : false ,
        message : "Errore del server durante la verifica del pagamento"
    })
}
})
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
