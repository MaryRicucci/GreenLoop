<?php
//Prepare Ok
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" => false ,
        "message" => "Sessione scaduta"
    ]);
    exit ;
}
$id_Utente = $_SESSION["id_Utente"];
if(!isset($_POST["id_Pagamento"])){
    echo json_encode([
        "success" => false ,
        "message" => "Id transazione non valido"
    ]);
    exit ;
}
$id_Pagamento = $_POST["id_Pagamento"];
$db = "GreenLoop" ;
$host = "localhost" ;
$user = "root" ;
$pass = "";
$conn = new mysqli($host,$user,$pass,$db);
if($conn -> connect_error){
    die("Connessione fallita");
}
$query = "SELECT stato from Pagamenti WHERE id_Pagamento = ? AND id_Utente = ?";
$template = $conn-> prepare($query);
$template -> bind_param("si",$id_Pagamento,$id_Utente);
$template -> execute();
$risultato = $template -> get_result();
if($risultato -> num_rows===0){
    echo json_encode([
        "success" => false ,
        "message" => "Transazione non trovata"
    ]);
    exit ;
}
$pagamento = $risultato -> fetch_assoc();
if ($pagamento["stato"]!=="pending"){
    echo json_encode([
        "success" => false ,
        "message" => "Pagamento già verificato",
        "stato" => $pagamento["stato"]
    ]);
    exit ;
}
//Risposta provider -> API


$stato = "approved";
$query = "UPDATE Pagamenti set stato = ? , id_Transazione = ? WHERE id_Pagamento = ? AND id_Utente = ?";
$template = $conn -> prepare($query);
$id_Transazione = "TRX_".time();
$template -> bind_param("ssii",$stato,$id_Transazione,$id_Pagamento,$id_Utente);
if(!$template -> execute()){
    echo json_encode([
        "success" => false ,
        "message" => "Aggiornamento stato non riuscito"
    ]);
    exit;
}
echo json_encode([
    "success" => true,
    "message" => "Transazione approvata",
    "transazione" => $id_Transazione,
    "stato" => $stato
]);
$conn -> close();

?>