<?php
//PREPARE Ok
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo (json_encode([
        "success" : false ,
        "message" : "Non autenticato"
    ]
    ));
    exit ;
}
    $id = $_SESSION["id_Utente"];
   
    $db = "GreenLoop" ;
    $host = "localhost";
    $user = "root";
    $pass = "";

    $conn = new mysqli($host,$user,$pass,$db);
    if($conn -> connect_error){
        die ("Connessione fallita");
    }
    $query = "SELECT * from Utenti WHERE id_Utente = ? ";
    $template = $conn -> prepare($query);
    $template -> bind_param("i",$id);
    $template -> execute();
    $risultato = $template -> get_result();
    if($risultato->num_rows===0){
        echo (json_encode([
            "success" : false ,
            "message" : "Utente non trovato"
        ]));
        exit;
    }
    $utente = $risultato -> fetch_assoc();
    echo (json_encode([
        "success" : true ,
        "data" : $utente 
    ]));
    
    $conn -> close();

?>