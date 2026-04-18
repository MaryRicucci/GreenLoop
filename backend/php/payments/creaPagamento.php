<?php
//Prepare Ok
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" => false ,
        "message" => "Sesione scaduta"
    ]);
    exit ;
}
$id_Utente =  $_SESSION["id_Utente"];
if(!isset($_POST["importo"])){
    echo json_encode([
        "success" => false ,
        "message" => "Importo non valido"
    ]);
    exit ;
}
if ($_POST["importo"]<=0){
    echo json_encode([
        "success" => false ,
        "message" => "Importo non attribuibile. E' negativo o nullo."
    ]);
    exit ;
}
$importo = $_POST["importo"];
if(!isset($_POST["provider"])){
    echo json_encode([
        "success" => false ,
        "message" => "Provider non valido"
    ]);
    exit ;
}
if(($_POST["provider"]!="satispay")&&($_POST["provider"])!="paypal"){
    echo json_encode([
        "success" => false,
        "message" => "Provider non autorizzato nel sistema. Utilizza Satispay o Paypal."
    ]);
    exit ;
}
$provider = $_POST["provider"];
$stato = "pending" ;
$db = "GreenLoop";
$user = "root";
$host = "localhost" ;
$pass = "";
$conn = new mysqli ($host,$user,$pass,$db);
if($conn -> connect_error){
    die("Connessione fallita");
}
$query = "INSERT INTO Pagamenti (id_Utente, provider, importo, stato, id_transazione, data_creazione)
values (?,?,?, ?,null, NOW())";
$template = $conn -> prepare($query);
$template -> bind_param("isds",$id_Utente, $provider, $importo, $stato);
if(!$template -> execute ()){
    echo json_encode([
        "success" => false ,
        "message" => "Inserimento pagamento non riuscito"
    ]);
    exit;
}
echo json_encode([
    "success" => true ,
    "message" => "Pagamento creato",   
]);
$conn -> close();
?>