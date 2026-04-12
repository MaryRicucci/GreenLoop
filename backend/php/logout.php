<?php
session_start();
if (!isset($_SESSION["id_Utente"])){
    echo json_encode([
        "success" : false ,
        "message" : "Nessuna sessione attiva";
    ]);
    exit ;
}
session_unset();
session_destroy();
setcookie(session_name(),"",time()-3600,"/");
echo json_encode([
    "success" : true ,
    "message" : "Logout effettuato"
]);
?>