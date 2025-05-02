<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Allow all origins
header("Access-Control-Allow-Methods: GET"); // Allow specific methods
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers
header("Content-Type: application/json");

require_once 'db.php';

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'data' => $users
    ]);
} else {
    echo json_encode([
        'status' => 'success',
        'data' => [],
        'message' => 'No users found.'
    ]);
}

$conn->close();
?>
