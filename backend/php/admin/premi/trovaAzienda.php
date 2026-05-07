<?php
function trovaAzienda($azienda) {
    $db = "GreenLoop";
    $user = "root";
    $host = "localhost";
    $pw = "";
    $conn = new mysqli($host,$user,$pw,$db);
    if($conn -> connect_error) {
        die ("Connessione fallita");
    }
    $query = "SELECT id_Azienda from Aziende WHERE nome = ? " ;
    $template = $conn -> prepare($query);
    $template -> bind_param("s",$azienda);
    $template -> execute();
    $risultato = $template -> get_result();
    if ($risultato -> num_rows ===0) {
        echo json_encode([
            "success" => false,
            "message" => "Azienda non trovata"
        ]);
        exit ;
    }
    $azienda = $risultato -> fetch_assoc();
    $id_Azienda = $azienda["id_Azienda"];
    return $id_Azienda;

}

?>