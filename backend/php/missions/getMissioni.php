<?php
$db = "GreenLoop" ;
$host = "localhost" ;
$user = "root" ;
$pass = "";
$conn = new mysqli($host,$user,$pass,$db);
if ($conn -> connect_error){
    die ("Connessione fallita");
}
$query = "SELECT * from Missioni";
$risultato = $conn -> query($query) ;
if ($risultato-> num_rows===0){
    echo json_encode([
        "success" => false ,
        "message" => "Non è stato possibile ottenere le missioni. Problemi del DB."
    ]);
    exit ;
}
$missioni = $risultato -> fetch_all(MYSQLI_ASSOC);
echo json_encode([
    "success" => true ,
    "missioni" => $missioni
]);
$conn -> close ();

?>