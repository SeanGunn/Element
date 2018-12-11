<?php
//ini_set('display_errors', 1);
header('Content-Type: application/json');
require('../includes/conn.inc.php'); 
$playerScore =  filter_var($_POST['playerScore'], FILTER_VALIDATE_INT);
$playerEmail = filter_var($_POST['playerEmail'], FILTER_VALIDATE_EMAIL);
$stmt = $pdo->prepare("SELECT ID FROM snakeGame WHERE gamePlayer = :gamePlayer");
$stmt->bindParam(':gamePlayer', $playerEmail, PDO::PARAM_STR);
$stmt->execute();
$total = $stmt->rowCount();
?>