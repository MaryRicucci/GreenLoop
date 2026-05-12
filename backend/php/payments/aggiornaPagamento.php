<?php
session_start() ;
if(!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success"=>false,
        "message" => "Sessione scaduta"
    ]);
    exit;
}
$id_Pagamento = $_POST["id_Pagamento"];
$stato = $_POST["stato"];
if(!stato||!$id_Pagamento) {
    echo json_encode([
        "success" => false,
        "message" => "Dati mancanti"
    ]);
    exit;
}
$db = "GreenLoop";
$user = "root";
$host = "localhost";
$pw = "";
$conn = new mysqli($host,$user,$pw,$db);
if($conn -> connect_error){
    die("Connessione fallita");
}
$query = "UPDATE Pagamenti set stato=? where id_Pagamento=?":
$template = $conn -> prepare($query);
$template-> bind_param("i",$id_Pagamento);
$template -> execute();
if($stato==="success"){
    
}


?>