<?php
header ("Content-Type: application/json");
require_once "../middleware.php";
include ("trovaAzienda.php");
$data = json_decode(file_get_contents("php://input"));
/*id_Azienda int ,
    nome varchar(100),
    descrizione varchar(255),
    costo int not null,
    qta int not null
    foreign key(id_Azienda) references Aziende(id_Azienda) ON DELETE CASCADE
*/
$azienda = $data["azienda"];
$nome = $data["nome"];
$descrizione = $data["descrizione"];
$costo = intval($data["costo"]);
$qta = intval($data["qta"]);
if ($qta<=0){
  echo json_encode([
    "success" => false,
    "message" => "Quantità non valita. Deve essere superiore a 0."
  ]);
  exit ;
}
$id_Azienda = trovaAzienda($azienda);
$db = "GreenLoop";
$host = "localhost" ;
$user = "root";
$pw ="";
$query = "INSERT into Aziende (id_Azienda, nome, descrizione, costo, qta) 
values (?,?,?,?,?)";
$conn = new mysqli($host, $user, $pw, $db);
if ($conn -> connect_error) {
  die("Connessione fallita");
}
$template = $conn -> prepare($query);
$template -> bind_param("issii",$id_Azienda,$nome,$descrizione,$costo,$qta);
$template-> execute();
echo json_encode([
  "success" => true,
  "message" => "Nuovo premio aggiunto correttamente"
]);
$conn -> close();
?>
