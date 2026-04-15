<?php
$conn = new mysqli("localhost", "root", "", "mrsm_system");

$id = $_POST['id'];

$conn->query("DELETE FROM repair_requests WHERE id=$id");

header("Location: admin.php");
?>
