<?php
// Set response content type
header('Content-Type: application/json');

// Read and decode the incoming JSON POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate incoming data
if (!isset($data['date']) || !isset($data['vote'])) {
    echo json_encode(["status" => "error", "message" => "Missing date or vote"]);
    exit;
}

// Path to the JSON file
$filePath = 'votes.json';

// Try to load existing votes
if (file_exists($filePath)) {
    $fileContent = file_get_contents($filePath);
    $votes = json_decode($fileContent, true);

    // If the file exists but is invalid, start fresh
    if (!is_array($votes)) {
        $votes = [];
    }
} else {
    // File doesn't exist, start fresh
    $votes = [];
}

// Add or update the vote for the given date
$votes[$data['date']] = $data['vote'];

// Save back to the file
if (file_put_contents($filePath, json_encode($votes, JSON_PRETTY_PRINT))) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to write to file"]);
}
?>
