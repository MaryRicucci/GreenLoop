<?php
header ("Content-Type: application/json");
require_once "../adminAuth.php";

$data = json_decode(file_get_contents("php://input");

$db = "GreenLoop";
$host = "localhost" ;
$user = "root";
$pw ="";

$conn = new mysqli($host, $user, $pw, $db);
if ($conn -> connect_error) {
  die("Connessione fallira");
}




?>
