<?php
require_once "../../middleware.php";
header("Content-Type: application/json");

$host = "localhost";
$db ="GreenLoop";
$user="root";
$pw  = "";

$conn =  new mysqli($host,$user,$pw,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "SELECT * from Missioni ORDER  BY id DESC";
$result = $conn -> query($query);
$missioni = $result-> fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true ,
    "missioni" => $missioni
]);
$conn -> close();
?>