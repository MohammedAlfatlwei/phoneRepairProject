<?php

$conn = new mysqli("localhost", "root", "", "mrsm_system");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$name = $_POST['name'];
$phone = $_POST['phone'];
$device = $_POST['device'];
$service = $_POST['service'];
$location = $_POST['location'];

$sql = "INSERT INTO repair_requests (name, phone, device, service, location)
        VALUES ('$name', '$phone', '$device', '$service', '$location')";

$conn->query($sql);

$conn->close();

header("Location: index.html");

?>