<?php
header ("Content-Type: application/json");
require_once "../middleware.php";

$data = json_decode(file_get_contents("php://input"),true);
$id = intval($data["id"]);
if($id<=0){
    echo json_encode([
        "success" => false,
        "message" => "Id non valido"
    ]);
    exit;
}
$db = "GreenLoop";
$host = "localhost";
$user = "root";
$pw = "";
$conn = new mysqli($host,$user,$pw,$db);
if($conn -> connect_error) {
    die("Connessione fallita");
}
$query = "SELECT id_Uttente, punti from Missioni_svolte WHERE id = ?";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id);
$template -> execute();
$result = $template -> get_result()->fetch_assoc();
if(!$result){
    echo json_encode([
        "success" => false,
        "message" => "Missione non trovata"
    ]);
    exit;
}
$id_Utente = $result["id_Utente"];
$punti = $result["punti"];
$query = "UPDATE Missioni_svolte SET stato = 'approvata' where id_Utente=?";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Utente);
$template -> execute();
echo json_encode([
    "success" => true
]);
$conn -> close();
?>