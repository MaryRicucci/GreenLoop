<?php
require_once "../../middleware.php";


$host = "localhost";
$db ="GreenLoop";
$user="root";
$pw  = "";

$conn -> new mysqli($host,$user,$pw,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "SELECT * from Missioni ORDER  BY id DESC";
$conn -> query($query);
$missioni = $query -> fetch_all(MYSQLI_ASSOC);

echo json_encode([
    "success" => true ,
    "missioni" => $missioni
]);
$conn -> close();
?>