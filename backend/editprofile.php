<?php
// CORS and content headers
header("Access-Control-Allow-Origin: *"); // Specify the trusted origin
header("Access-Control-Allow-Methods: PUT, OPTIONS"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Content-Type: application/json");

// Handle OPTIONS request (pre-flight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'PUT') {
    http_response_code(405);
    echo json_encode(["message" => "Only PUT method is allowed"]);
    exit;
}

include 'db.php'; // ✅ Your database connection file

// Get the user ID from query string
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(["message" => "User ID is required"]);
    exit;
}

$userId = intval($_GET['id']);

// Read input JSON
$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON input"]);
    exit;
}

// Sanitize and assign values
$firstname = $input['firstname'] ?? '';
$lastname = $input['lastname'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$password = $input['password'] ?? ''; // Optional
$dob = $input['dob'] ?? '';
$city = $input['city'] ?? '';
$state = $input['state'] ?? '';

// Hash password if provided
if (!empty($password)) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
} else {
    $hashedPassword = null; // Don't update password if not provided
}

// Prepare update query
$query = "UPDATE users SET 
    firstname = '$firstname', 
    lastname = '$lastname', 
    email = '$email', 
    phone = '$phone', 
    password = '$password', 
    dob = '$dob', 
    city = '$city', 
    state = '$state' 
    WHERE id = $userId";

$stmt = $conn->prepare($query);

// Execute the query
if ($stmt->execute()) {
    echo json_encode(["message" => "Profile updated successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Failed to update profile"]);
}

$stmt->close();
$conn->close();
?>