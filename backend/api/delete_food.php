<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT * FROM foods WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $food = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($food) {
        $query = "DELETE FROM foods WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            if (!empty($food['image']) && file_exists("../uploads/" . $food['image'])) {
                unlink("../uploads/" . $food['image']); // ลบไฟล์ภาพที่เกี่ยวข้อง
            }
            echo json_encode(["message" => "Food deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete food"]);
        }
    } else {
        echo json_encode(["message" => "Food not found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method or ID"]);
}
?>
