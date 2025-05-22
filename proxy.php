<?php
header('Content-Type: application/json');

$apiKey = 'fe17749c3e942e70e9ace6165e10de19';

if (!isset($_GET['q']) || empty($_GET['q'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing query parameter']);
    exit;
}

$query = urlencode($_GET['q']);

$url = "https://newsapi.org/v2/everything?q=$query&pageSize=10&sortBy=publishedAt&apiKey=$apiKey";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if(curl_errno($ch)) {
    echo json_encode(['status' => 'error', 'message' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
echo $response;
?>
