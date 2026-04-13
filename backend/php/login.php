<?php
//PREPARE Ok
$email = $_POST["email"];
$pw = $_POST["pw"];

$db = "GreenLoop";
$pass = "";
$host = "localhost";
$user = "root";

$conn = new mysqli ($host,$user,$pass,$db);
if ($conn -> connect_error) {
    die ("Connessione fallita");
}
$query = "SELECT * from Utenti WHERE email = ? ";
$template = $conn -> prepare($query);
$template -> bind_param("s",$email);
$template -> execute();
$risultato  = $template -> get_result();

if ($risultato->num_rows>0) {
    $row = $risultato -> fetch_assoc();
    $password = $row["pw"];
    session_start();
    if (password_verify($pw,$password)){
        $_SESSION["id_Utente"] = $row["id_Utente"];
        echo json_encode([
           "success" => true ,
           "message" => "Login effettuato";
        ]);
        exit ;
    }
    else {
        echo json_encode([
            "success" => false ,
            "message" => "Password errata"
        ]);
        exit ;
    }
}
else {
    echo (json_encode([
        "success" => false ,
        "message" => "email non trovata"
    ]))
}
$conn -> close();

?>