<?php
header("Content-Type: application/json");
require_once "../middleware.php";
$host = "localhost";
$db = "GreenLoop" ;
$user = "root";
$pw = "";

$conn = new mysqli ($host, $user, $pw, $db);
if ($conn -> connect_error) {
  die("Connessione fallita");
}
$query = "SELECT * FROM Premi order by id desc" ;
$result = $conn -> query($query);
$premi = $result -> fetch_all(MYSQLI_ASSOC);
echo json_encode([
  "success" => true,
  "premi" => $premi
]);

$conn-> close();
?>
