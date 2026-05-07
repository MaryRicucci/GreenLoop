<?php
header("Content-Type: application/json";
require_once "../adminAuth.php";
$host = "localhost";
$db = "GreenLoop" ;
$user = "root";
$pw = "";

$conn = new mysqli ($host, $user, $pw, $db);
if ($conn -> connect_error) {
  die("Connessione fallita");
}
$query = "SELECT * FROM Premi order by id desc" ;
$conn -> query($query);
$premi = $conn -> fetch_all(MYQLI_ASSOC);
echo json_encode([
  "success" => true,
  "premi" => $premi
]);

$conn-> close();
?>
