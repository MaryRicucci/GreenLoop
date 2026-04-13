<?php
//PREPARE Ok
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" : false ,
        "message" : "Sessione scaduta"
    ]);
}
$id = $_SESSION["id_Utente"];
$db = "GreenLoop" ;
$host = "localhost" ;
$user = "root" ;
$pass = " " ;
$conn = new mysqli($host,$user,$pass,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}

$query = "SELECT * from Missioni_completate WHERE id_Utente = ? AND stato = 'approved' ";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id);
$template -> execute();
$risultato = $template -> get_result();
if(!isset($risultato)||($risultato-> num_rows===0)){
    echo json_encode([
        "success" : false ,
        "message" : "Missioni dell'utente non trovate"
    ]);
}
$missioni = $risultato -> fetch_all(MYSQLI_ASSOC); //Prende tutte le righe di risultato con i suoi campi
echo json_encode([
    "success" : true ,
    "message" : $missioni
]);
$conn -> close();
?>