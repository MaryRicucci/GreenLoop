<?php
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" => false,
        "message" => "Non autenticato"
    ]);
    exit;
}
$id_Utente = $_SESSION["id_Utente"];
$conn = new mysqli("localhost","root","","GreenLoop");
if($conn-> connect_error){
    die("Connessione fallita");
}
$query = "SELECT importo, data_creazione, provider, stato from Pagamenti 
WHERE id_Utent=? order by data_creazione desc";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Utente);
$template -> execute();
$result = $template -> get_result();
$storico = [];
while($row = $result -> fetch_assoc()){
    $storico[]=$row;
}
echo json_encode($storico);
$conn -> close();
?>