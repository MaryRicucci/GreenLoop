<?php
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" => false ,
        "message" => "Sessione scaduta"
    ]);
    exit ;
}
$id_Utente = $_SESSION["id_Utente"];
$db = "GreenLoop" ;
$host = "localhost";
$user = "root";
$pass = "";
$conn = new mysqli($host,$user,$pass,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "SELECT * from Registro_attività WHERE id_Utente = ? ORDER BY data";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Utente);
$template -> execute();
$risultato = $template -> get_result();
if($risultato -> num_rows===0){
    echo json_encode([
        "success" => false ,
        "message" => "Non è stato possibile ottenere il log"
    ]);
    exit ;
}
$log = $risultato -> fetch_all(MYSQLI_ASSOC);
echo json_encode([
    "success" => true ,
    "log" => $log 
]);
$conn -> close();
?>