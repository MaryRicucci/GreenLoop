<?php
header("Content-Type: application/json");
require_once "../middleware.php";
$data = json_decode(file_get_contents("php://input"),true);
$id = intval($data["id"]);
if ($id<=0){
    echo json_encode([
        "success" => false,
        "message" => "ID non valido"
    ]);
    exit ;
}
$db = "GreenLoop";
$host = "localhost";
$user = "root";
$pw = "";
$conn = new mysqli($host,$user,$pw,$db);
$query = "UPDATE Missioni_svolte set stato = 'rifiutata' WHERE id =? ";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id);
$template -> execute();
echo json_encode(["success"=>true]);
$conn -> close();
?>