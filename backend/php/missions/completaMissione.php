<?php
//Prepare Ok
session_start();
if(!isset($_SESSION["id_Utente"])){
    echo json_encode ([
        "success" => false,
        "message" => "Sessione scaduta"
    ]);
    exit ;
}
$idMissione = $_POST["id_Missione"];
$id = $_SESSION["id_Utente"];

//Controllo il file
if (!isset($_FILES("foto"))){
    json_encode([
        "success" => false ,
        "message" => "Nessun file trovato" 
    ]);
    exit ;
}
//Ottengo il file
$foto = $_FILES["foto"];
//Validazione tipo file
$allowed = ["image/jpeg","image/png"];
if (!in_array($foto["type"],$allowed)){
    echo json_encode([
        "success" => false ,
        "message" => "Formato non valido. Usa JPG o PNG"
    ]);
    exit;
}
$db = "GreenLoop";
$host = "localhost";
$pass = "";
$user = "root";
$conn =  new mysqli($host,$user,$pass,$db);
if ($conn -> connect_error){
    die("Connessione fallita");
}
$query = "SELECT * from Missioni_completate WHERE id_Utente = ? AND id_Missione = ? AND stato = 'approved' ";
$template = $conn -> prepare($query);
$template -> bind_param("ii",$id,$idMissione);
$template -> execute();
$risultato = $template -> get_result();
if ($risultato -> num_rows>0){
    echo json_encode([
        "success" => false ,
        "message" => "Missione già stata completata"
    ]);
    exit ;
}
//Salvataggio file
$uploadDir =__DIR__. "/uploads/missioni/";
if (!file_exists($uploadDir)){
    mkdir($uploadDir,0777,true);
}
$ext = pathinfo($foto["name"],PATHINFO_EXTENSION());
$filename = "missione_".$id."_".time()."".$ext ;
$filepath = $uploadDir.$filename;
if(!move_uploaded_file($foto["tmp_name"],$filepath)){
    echo json_encode([
        "success" => false ,
        "message" => "Errore nel salvataggio file"
    ]);
    exit ;
}
//Percorso da salvare nel DB
$fotoDB = "/uploads/missioni/".$filename;

$query = "SELECT punti from Missioni WHERE id_Missione = ?";
//Prepare
//Assegna punti
$template = $conn -> prepare($query) ;
$template -> bind_param("i",$idMissione);
$template -> execute();
$punti = $template -> get_result();
$punti = $punti -> fetch_assoc();
if (!isset($punti)){
    echo json_encode([
        "success" => false ,
        "message" => "Non è stato possibile trovare i punti Missione"
    ]);
    exit ;
}
$query = "UPDATE Utenti set punti = ? WHERE id_Utente = ?";
$template = $conn -> prepare($query);
$template -> bind_param("ii",$punti["punti"],$id);
if($template -> execute()){
    echo json_encode([
        "success" : true,
        "message" : "Prove della missione caricate con successo",
        "punti" : $punti
    ]);
}
$conn -> close();
?>