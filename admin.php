<?php
session_start();

if (!isset($_SESSION['logged_in'])) {
    header("Location: login.php");
    exit();
}
?>
<?php
$conn = new mysqli("localhost", "root", "", "mrsm_system");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM repair_requests ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>

<head>
    <title>Admin Dashboard</title>
    <style>

        body {
            font-family: Arial;
            background: #f4f6f8;
            padding: 20px;
        }

        h1 {
            text-align: center;
        }

        .card {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .location a {
            color: blue;
        }

    </style>
</head>

<body>

<h1>📊 Repair Requests Dashboard</h1>
<a href="logout.php">Logout</a>

<?php while($row = $result->fetch_assoc()) { ?>

<div class="card">
    <p><strong>Name:</strong> <?php echo $row['name']; ?></p>
    <p><strong>Phone:</strong> <?php echo $row['phone']; ?></p>
    <p><strong>Device:</strong> <?php echo $row['device']; ?></p>
    <p><strong>Service:</strong> <?php echo $row['service']; ?></p>

    <p class="location">
        <strong>Location:</strong> 
        <a href="<?php echo $row['location']; ?>" target="_blank">Open Map</a>
    </p>

    <p><strong>Date:</strong><?php echo date("d/m/Y", strtotime($row['created_at'])); ?></p>
    
    <form method="POST" action="delete.php">
        <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
        <button type="submit">Delete</button>
    </form>
</div>



<?php } ?>


</body>
</html>
