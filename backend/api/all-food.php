<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once '../config/db.php';  // ใช้ไฟล์เชื่อมต่อฐานข้อมูล

try {
    // SQL สำหรับดึงข้อมูลทั้งหมดจากตาราง foods
    $sql = "SELECT id, name, description, image, created_at, details FROM foods";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if ($stmt->rowCount() > 0) {
        $foods = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // แสดงข้อมูลในรูปแบบ JSON
        echo json_encode($foods);
    } else {
        echo json_encode(["message" => "No food items found."]);
    }

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

// ปิดการเชื่อมต่อ (ไม่จำเป็นต้องปิด แต่กำหนด conn เป็น null เพื่อชัดเจน)
$conn = null;
?>
