<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once '../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['id'])) {
    $id = $_GET['id'];

    $query = "SELECT * FROM foods WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $food = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($food) {
        $name = !empty($_POST['name']) ? $_POST['name'] : $food['name'];
        $description = !empty($_POST['description']) ? $_POST['description'] : $food['description'];
        
        // ตรวจสอบและจัดการไฟล์อัพโหลด (รูปภาพ)
        $image = $food['image'];
        if (!empty($_FILES['image']['name'])) {
            $image = time() . '_' . $_FILES['image']['name'];
            $upload_dir = '../uploads/' . $image;
            move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir);
        }

        $query = "UPDATE foods SET name = :name, description = :description, image = :image WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":image", $image);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Food updated successfully"]);
        } else {
            echo json_encode(["message" => "Failed to update food"]);
        }
    } else {
        echo json_encode(["message" => "Food not found"]);
    }
} else {
    echo json_encode(["message" => "Invalid request method or ID"]);
}
?>
