<?php 
// var_dump($_POST);

$turn_on = $_POST['turn_on_htaccess'];
// var_dump($_SERVER['HTTP_REFERER']);
setcookie("htaccess",true,time()+3600,'/');
// setcookie("product", "ok", time()+3600,'/');
// echo "<br>";
// var_dump($_COOKIE);

header('location:'.$_SERVER['HTTP_REFERER']);

?>