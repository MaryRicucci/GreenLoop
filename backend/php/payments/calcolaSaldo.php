<?php
session_start() ;
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success"=> false,
        "message" => "Sessione scaduta"
    ]);
    exit;
}
$id_Utente = $_SESSION["id_Utente"];
$db = "GreenLoop",
$user = "root";
$pw = "";
$host = "localhost";
$conn = new mysqli($host,$user,$pw,$db) ;
if ($conn -> connect_error) {
    die ("Connessione fallita");
}
$query = "SELECT punti from Utenti WHERE id_Utente=? ";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Utente);
$template -> execute();
$resulte = $template -> get_result();
$punti = $resulte -> fetch_assoc();
function convertiPuntiInEuro($punti) {
    if ($punti <=500) {return $punti*0.01;};
    if($punti<=1500) {return 500*0.01+($punti-500)*0.012;};
    return 500*0.01+1000*0.012+($punti-1500)*0.015;
};
$saldo = convertiPuntiInEuro($punti);
echo json_encode([
    "success" => true ,
    "punti" => $punti ,
    "saldo" => $saldo
]);
$conn -> close();
?>