<?php
header('Content-Type: application/json');

$apiKey = 'd7aa2d110cac42f59dc97c95b817e193'; // GANTI dengan API Key awak

if (!isset($_GET['q']) || empty($_GET['q'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing query parameter']);
    exit;
}

$query = urlencode($_GET['q']);

// Contoh endpoint mediastack
$url = "http://api.mediastack.com/v1/news?access_key=$apiKey&keywords=$query&languages=en&limit=10";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo json_encode(['status' => 'error', 'message' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
echo $response;
?>
