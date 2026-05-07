<?php
require_once "../middleware.php";
header("Content-Type: application/json");
$data = json_decode(file_get_contents("php://input"),true);
$id = intval($data["id"]);
if($id<=0){
    echo json_encode([
        "success" => false ,
        "message" => "Id non valido"
    ]);
    exit;
}
$db = "GreenLoop";
$host = "localhost";
$user = "root";
$pw =  "";

$conn = new mysqli($host,$user, $pw,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "DELECT from Missioni where id = ?";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id);
$template->execute();
echo json_encode ([
    "success" => true
]);
$conn -> close();

?>