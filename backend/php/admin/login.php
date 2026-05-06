<?php

$data = json_encode(file_get_contents("php://input"),true),
$email = $data["email"];
$password = $data["password"] ;

$db = "GreenLoop";
$user = "root";
$host = "localhost",
$pw = "";

$conn = new mysqli($host,$user, $pw, $db);
if ($conn -> connect_error){
    die ("Connessione fallita";)
}
$query = "SELECT from Admin where email = ? ";
$template = $conn -> prepare($query);
$template -> bind_param("s",$email);
$template -> execute ();
$result = $template -> get_result();
if ($result -> num_rows==0){
    echo json_encode([
        "success" => false ,
        "message" => "Utente Admin non trovato"
    ]);
    exit ;
}
$admin = $result->fetch_assoc();

if(!password_verify($password,$admin["password_hash"])){
    echo json_encode([
        "success" => true ,
        "message" => "Password errata";
    ]);
    exit ;
}
setcookie("admin_session",$admin["id"],time()+3600*24, "/","",false,true);
echo json_encode([
    "success" => true
]);
$conn -> close();
?>