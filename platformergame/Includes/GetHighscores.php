<?php
$dsn = 'mysql:host=localhost;dbname=b7008714_db1';
$user = 'b7008714';
$password = 'Meme1999';
try { 
$pdo = new PDO($dsn, $user, $password); 
$pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
$pdo ->exec("SET CHARACTER SET utf8");
}
catch (PDOException $e) { 
echo 'Connection failed again: ' . $e->getMessage();
}

$sql = "SELECT Name,Score,Date FROM HighScores ORDER BY Score DESC LIMIT 5";
$result = $pdo -> query($sql);

$results = array();

while($row = mysql_fetch_assoc($result)) {
	$results[] = $row;
}

echo json_encode($results);


?>