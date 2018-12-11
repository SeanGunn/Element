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

$playerName;
$highscore;
$date = date("Y/m/d");


if(isset($_POST['playerName'])) {
	$playerName = $_POST['playerName'];
}

if(isset($_POST['highscore'])) {
	$highscore = $_POST['highscore'];
}


$sql = "SELECT playerID FROM HighScores WHERE playerName = $playerName";
$result = $pdo -> prepare($sql);
$pdo -> execute();

if ($row > 0) {
	$sql = "UPDATE HighScores SET Score = $highscore WHERE playerID = $result";
}

else {
	$sql = "INSERT INTO HighScores (Name, Score, Date) VALUES($playerName, $highscore, $date)";
	$pdo -> prepare($sql);
}

?>