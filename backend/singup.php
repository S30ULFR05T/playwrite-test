<?php
// CORS and content headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Content-Type: application/json");

// Database connection details
require_once 'db.php';

// Ensure it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Only POST method allowed."]);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);

// Check required fields
if (!$input || !isset($input['firstname']) || !isset($input['email']) || !isset($input['password'])) {
    echo json_encode(["status" => "error", "message" => "Missing required fields."]);
    exit();
}

// Insert query
$stmt = $conn->prepare("INSERT INTO users (firstname, lastname, email, phone, password, dob, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "ssssssss",
    $input['firstname'],
    $input['lastname'],
    $input['email'],
    $input['phone'],
    $input['password'],
    $input['dob'],
    $input['city'],
    $input['state']
);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User signed up successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error while saving user."]);
}

$stmt->close();
$conn->close();
?>
