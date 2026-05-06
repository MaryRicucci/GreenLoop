<?php
require_once "../middleware.php";

$data = json_decode(file_get_contents("php://input"),true);
$titolo = $data["titolo"];
$descrizione = $data["descrizione"];
$punti=intval($data["punti"]);

if(!$titolo||!$descrizione||$punti<=0){
    echo json_encode([
        "success" => false,
        "message" => "Dati mancanti"
    ]);
    exit;
}
$db = "GreenLoop";
$host = "localhost";
$user="root";
$pw = "";
$conn = new mysqli($host,$user,$pw,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "INSERT into Missioni (titolo, descrizione,punti,image_required,data_creazione)
values (?,?,?,true, NOW())";
$template = $conn -> prepare($query);
$template -> bind_param("ssi",$titolo,$descrizione,$punti);
$template -> execute();

echo json_encode([
    "success" => true;
]);
$conn -> close();

?>