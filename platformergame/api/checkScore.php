<?php
//ini_set('display_errors', 1);
header('Content-Type: application/json');
require('../includes/conn.inc.php'); 
// Add SQL
$sql = "---";
$stmt = $pdo->query($sql);
$highScoreRow = $stmt->fetchObject();
$returnAr = array('highScore' => $highScoreRow->highScore);
echo json_encode($returnAr);
?>