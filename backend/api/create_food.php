<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['name']) && !empty($_POST['description'])) {
        
        // ตรวจสอบและจัดการไฟล์อัพโหลด (รูปภาพ)
        $image = '';
        if (!empty($_FILES['image']['name'])) {
            $image = time() . '_' . $_FILES['image']['name'];
            $upload_dir = '../uploads/' . $image;
            move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir);
        }

        $query = "INSERT INTO foods (name, description, image) VALUES (:name, :description, :image)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $_POST['name']);
        $stmt->bindParam(":description", $_POST['description']);
        $stmt->bindParam(":image", $image);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Food created successfully"]);
        } else {
            echo json_encode(["message" => "Failed to create food"]);
        }
    } else {
        echo json_encode(["message" => "Name and description are required"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method"]);
}
?>
