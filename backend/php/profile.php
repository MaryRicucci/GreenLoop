<?php
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
    $query = "SELECT * from Utenti WHERE id = '$id' ";
    $risultato = $conn -> query($query);
    if((!$risultato)||($risultato->num_rows===0)){
        echo (json_encode([
            "success" : false ,
            "message" : "Utente non trovato"
        ]));
        exit;
    }
    $utente = $risultato -> fetch_assoc();
    echo (json_encode([
        "success" : true ,
        "message" : $utente 
    ]));

?>