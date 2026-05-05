<?php

if (!isset($_COOKIE["admin_session"])) {
    echo json_encode(["unauthorized" => true]);
    exit;
}

$adminId = intval($_COOKIE["admin_session"]);

$stmt = $conn->prepare("SELECT id FROM admin WHERE id = ?");
$stmt->bind_param("i", $adminId);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 0) {
    echo json_encode(["unauthorized" => true]);
    exit;
}
