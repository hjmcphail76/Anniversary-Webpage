<?php
// Read the incoming data from POST
$data = json_decode(file_get_contents("php://input"), true);

// Path to the JSON file
$filePath = 'votes.json';

// Check if the file exists
if (file_exists($filePath)) {
    // Read existing votes data
    $votes = json_decode(file_get_contents($filePath), true);
} else {
    // If the file doesn't exist, start with an empty array
    $votes = [];
}

// Add the new vote to the votes array
if (isset($data['date']) && isset($data['vote'])) {
    $votes[$data['date']] = $data['vote'];
}

// Save the updated votes data back to the file
file_put_contents($filePath, json_encode($votes, JSON_PRETTY_PRINT));

// Return a success response
echo json_encode(["status" => "success"]);
?>
