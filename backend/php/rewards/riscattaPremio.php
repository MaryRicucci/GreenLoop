<?php
//Prepare Ok
session_start();
if (!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" => false ,
        "message" => "Sessione scaduta" 
    ]);
    exit ;
}
$id_Utente = $_SESSION["id_Utente"];
if (!isset($_POST["id_Premio"])){
    echo json_encode([
        "success" => false ,
        "message" => "Id Premio non valido"
    ]);
    exit ;
}
$id_Premio = $_POST["id_Premio"];

$db = "GreenLoop" ;
$user = "root" ;
$host = "localhost" ;
$pass = "" ;
$conn = new mysqli($host,$user,$pass,$db);
if($conn -> connect_error){
    die ("Connessione fallita");
}
$query = "SELECT punti from Utenti WHERE id_Utente = ?";
$template = $conn -> prepare ($query);
$template -> bind_param("i",$id_Utente);
$template -> execute();
$esito = $template -> get_result();
$punti = $esito -> fetch_assoc();

$query = "SELECT qta, costo from Premi WHERE id_Premio = ?";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Premio);
$template -> execute();
$esito = $template -> get_result();
if ($esito->num_rows===0){
    echo json_encode([
        "success" => false ,
        "message" => "Non è stato possibile otteneri i dati del premio"
    ]);
    exit ;
}
$premio = $esito -> fetch_assoc();
if ($premio["qta"]===0){
    echo json_encode([
        "success" => false ,
        "message" => "Premio non disponibile"
    ]);
    exit ;
}
if ($premio["costo"]>$punti["punti"]){
    echo json_encode([
        "success" => false ,
        "message" => "Punti insufficienti per riscuotere il premio"
    ]);
    exit ;
}
//QUI
$points = $punti["punti"]- $premio["costo"];
$query = "UPDATE Utenti SET punti = ? WHERE id_Utente = ?";
$template = $conn -> prepare($query);
$template -> bind_param("ii",$points,$id_Utente);
if (!$template -> execute()){
    echo json_encode([
        "success" => false ,
        "message" => "Errore nell'aggiornamento dei punti"
    ]);
    exit;
}
$query = "UPDATE Premi SET qta = qta - 1 WHERE id_Premio = ?";
$template = $conn -> prepare($query);
$template -> bind_param("i",$id_Premio);
if(!($template -> execute())){
    echo json_encode([
        "success" => false ,
        "message" => "Errore nell'aggiornamento della qta"
    ]);
    exit ;
}

$query = "INSERT INTO Premi_Riscattati (id_Utente, id_Premio, data_riscatto)
VALUES (?,?,NOW())";
$template = $conn -> prepare($query);
$template -> bind_param("ii",$id_Utente,$id_Premio);
if(!($template -> execute())){
    echo json_encode([
        "success" => false ,
        "message" => "Errore nell'inserimento in DB di Premio riscattato"
    ]);
    exit ;
}

$query = "INSERT INTO Registro_attività (id_Utente, azione, dettagli, data) 
VALUES (?, 'riscatto premio', ? , NOW())";
$dettagli = "E' stato riscattato il premio con id=".$id_Premio ;
$template = $conn -> prepare($query);
$template -> bind_param("is",$id_Utente,$dettagli);
if(!($template -> execute())){
    echo json_encode([
        "success" => false ,
        "message" => "Errore nell'inserimento del log"
    ]);
    exit;
}
echo json_encode ([
    "success" => true ,
    "punti" => $points 
]);
$conn -> close();
?>