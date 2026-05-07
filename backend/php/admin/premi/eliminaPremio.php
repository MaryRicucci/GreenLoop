<?php
require_once "../middleware.php";
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"));
$id_Premio = intval($data["id_Premio"]);
if ($id_Premio<=0) {
    echo json_encode([
        "success" => false ,
        "message" => "ID premio non valido."
    ]);
    exit ;
}
$db = "GreenLoop";
$host = "localhost";
$user = "root";
$pw = "";

$conn = new mysqli($host, $user, $pw, $db) ;
if ($conn -> connect_error) {
    die ("Connessione fallita");
}
$query = "DELETE FROM Premi WHERE id_Premio = ? " ;
$template = $conn -> prepare($query) ;
$template -> bind_param("i",$id_Premio);
$template -> execute();
echo json_encode ([
    "success" => true ,
    "message" => "Premio eliminato."
]);
$conn -> close();
?>