<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

include_once '../config/db.php';

$query = "SELECT * FROM foods";
$stmt = $conn->prepare($query);
$stmt->execute();

$foods = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($foods);
?>
