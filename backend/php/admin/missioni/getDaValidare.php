<?php
header("Content-Type: application/json");
require_once "../middleware.php";

$db = "GreenLoop";
$user="root";
$pw="";
$host = "localhost";

$conn = new mysqli($host,$user,$pw,$db);
if ($conn -> connect_error) {
    die ("Connessione fallita");
}
$query = "SELECT ms.id, ms.user_id, m.titolo, m.descrizione, ms.punti, m.foto
FROM Missioni_svolte as ms JOIN Missioni as m ON m.id_Missione = ms.id_Missione
WHERE ms.stato = 'in_attesa' ORDER BY ms.id desc";

$result = $conn -> query($query);
if($result -> num_rows===0) {
    echo json_encode ([
        "success" => false,
        "message" => "Impossibile validare le missioni"
    ]);
    exit;
}
$missioni = $result -> fetch_all(MYSQLI_ASSOC);
echo json_encode([
    "success" => true,
    "missioni" => $missioni
]);
$conn -> close();
?>