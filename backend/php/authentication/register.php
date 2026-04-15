<?php
//PREPARE Ok
$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$email=$_POST["email"];
$password = $_POST["password"];

$db = "GreenLoop";
$pw = "";
$user="root";
$host="localhost";

if (!isset($nome,$cognome,$email,$password)){
   $conn = new mysqli ($host,$user,$pw,$db);
   if($conn->connect_error){
    die("Connessione fallita");
   }
   $query = "SELECT * FROM Utenti WHERE email = ? ";
   $template = $conn -> prepare($query);
   $template -> bind_param("s",$email);
   $template -> execute();
   $risultato = $template -> get_result();
    if ($risultato -> num_rows>0){
        echo(json_encode([
            "success" => false ,
            "message" => "Email già registrata"
        ]));
        exit ;
      }
      else {
        $password = password_hash($password,PASSWORD_DEFAULT);
        $query = "INSERT into GreenLoop.Utenti (nome, cognome, email, pw, id_google, punti , data_registrazione, ruolo) 
        values (?, ? ,?, ?, null, 0, NOW(), 'user')";
        $template = $conn -> prepare($query);
        $template -> bind_param("ssss",$nome,$cognome,$email,$password);
        if($template -> execute()){
            $id = $conn -> insert_id ;
            echo json_encode([
                "success" => true ,
                "message" => "Registrazione completata" ,
                "id_Utente" => $id 
            ]);
            exit ;
        }
        else {
            echo json_encode([
                "success" => false ,
                "message" => "errore durante la registrazione"
            ]);
            exit ;
        }
      }
   }
else {
    echo json_encode([
        "success" => false ,
        "message" => "campi non validi"
    ]);
}
$conn -> close();

?>