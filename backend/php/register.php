<?php
$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$email=$_POST["email"];
$password = $_POST["password"];

$db = "GreenLoop";
$pw = "";
$user="root";
$host="localhost";

if (isset($nome)&&(isset($cognome)&&(isset($email)&&(isset($password))))){
   $conn = new mysqli ($host,$user,$pw,$db);
   if($conn->connect_error){
    die("Connessione fallita");
   }
   $query = "SELECT * FROM Utenti WHERE email = '$email'";
   $risultato = $conn -> query($query);
   if ($risultato){
      if ($risultato -> num_rows>0){
        echo(json_encode([
            "success" => false ,
            "message" => "Email già registrata"
        ]));
        exit ;
      }
      else {
        $password = password_hash($password,PASSWORD_DEFAULT);
        $query = "INSERT into GreenLoop.Utenti (nome, cognome, email, pw, id_Google, punti , data_registrazione, ruolo) 
        values ('$nome', '$cognome','$email', '$password', null, 0, NOW(), 'user')";
        $risultato = $conn -> query($query) ;
        if($risultato){
            $id = $conn -> insert_id ;
            echo json_encode[
                "success" => true ,
                "message" => "Registrazione completata" ,
                "id_Utente" => $id 
            ];
            exit ;
        }
        else {
            echo json_encode[
                "success" => false ,
                "message" => "errore durante la registrazione"
            ];
            exit ;
        }
      }
   }
}
else {
    echo json_encode[
        "success" => false ,
        "message" => "campi non validi"
    ];
}

?>