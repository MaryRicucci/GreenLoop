<?php
$db = "GreenLoop";
$host = "localhost" ;
$user = "root";
$pass = "";

$conn = new mysqli($host,$user,$pass,$db);
if ($conn ->connect_error){
    die("Connessione fallita");
}
$query = "SELECT * from Premi WHERE qta > 0";
$risultato = $con -> query($query);
if ((!$sisultato)||($risultato -> num_rows===0)){
    echo json_encode([
        "success" => false ,
        "message" => "Non ci sono premi disponibili" 
    ]);
    exit ;
}
$premi = $risultato -> fetch_all(MYSQLI_ASSOC);
echo json_encode([
    "success" : true ,
    "premi" : $premi 
]);
$conn -> close();
?>