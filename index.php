<?php 

// foreach ($_SERVER as $key => $value) {
// 	echo $key." = ".$value."<br>";
// }

//// USUWA WSZYSTKIE PLIKI COOKIE
if (isset($_POST['delete_ck'])) {
if (isset($_SERVER['HTTP_COOKIE'])) {

    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time()-1000);
        setcookie($name, '', time()-1000, '/');
        var_dump($_POST);
    }
}
unset($_POST['delete_ck']);
header('Location: ' . $_SERVER['SCRIPT_NAME']);
}

//SZUKA I ROZDZIELA STRONE NA STRONA I MODUL
$QUERY_Path = preg_replace('/url=/u', '', $_SERVER['QUERY_STRING']);
$QUERY_Parts = explode('/', $QUERY_Path);
$Page = array_shift($QUERY_Parts);
$Module = array_shift($QUERY_Parts);

if ($Page == "") {
	$Page = "index";
	$Module = "index";
}else {
	if ($Module == "") {
		$Module = "main";
	}
}

//SPRAWDZA NA JAKIEJ STRONIE SIE ZNAJDUJE
function pages($query) {

$links = ["index"=>"pages/main.php",
	"index.php"=>"pages/main.php",
	"home"=>"pages/main.php",
	"konstruktor_mat"=>"pages/konstruktor_mat.php",
	"min_liczba"=>"pages/min_liczba.php",
	"przedzial"=>"pages/przedzial.php",
	"przedzial.php"=>"pages/przedzial.php"
];
$found = false;
foreach ($links as $key => $value) {
	if ($query == $key || $query == '?'.$key) {
		return $value;
		$found = true;
	}
}if (!$found) {return false;}

}
$link_to_page = pages($Page);


if (!pages($Page)) {
	require_once "pages/404.php";
	die();
}

// var_dump($_COOKIE);

//ODSYLACZY DO CSS I JS KONFIGURUJE SIE PLIKIEM HTACCESS
$link_to_dir = "";

if (isset($_COOKIE['htaccess'])) {
	$link = preg_replace('/index.php/u', '',$_SERVER['SCRIPT_NAME']);
	$link_to_dir = $link;
}

// echo $Page;


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Rem Karablin</title>
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;1,300&family=Roboto&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">

	<link rel="stylesheet" href="<?=$link_to_dir?>css/style.css">

	<script src="<?=$link_to_dir?>js/Rlibrary.js"></script>

	<!-- CZESC KONSTRUKTORA -->

	<link rel="stylesheet" href="<?=$link_to_dir?>css/konstruktor.css">

	<script src="https://unpkg.com/mathjs/lib/browser/math.js"></script>

<!-- 	<script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
	<!-- <script src="<?=$link_to_dir?>js/math.js"></script> -->

<script>
//sourse https://vk-book.ru/opredelit-brauzer-s-pomoshhyu-javascript/
function get_name_browser(){
    var ua = navigator.userAgent;    
    if (ua.search(/Chrome/) > 0) return {"i":0,"name":'Google Chrome'};
    if (ua.search(/Firefox/) > 0) return {"i":1,"name":'Firefox'};
    if (ua.search(/Opera/) > 0) return {"i":2,"name":'Opera'};
    if (ua.search(/Safari/) > 0) return {"i":3,"name":'Safari'};
    if (ua.search(/MSIE/) > 0) return {"i":4,"name":'Internet Explorer'};
    return {"i":5,"name":'undefined'};
}
 
var browser = get_name_browser();
//endsourse
window.onload = function() {
	if (browser.i == 1 || browser.i == 2 || browser.i == 4 || browser.i == 5) {
		document.querySelector(".nav").classList.add('nav_diff');
	}
}
//sourse https://mathjs.org/
// console.log(math.evaluate('1.2 * (2 + 4.5)'));
//endsourse
</script>
</head>
<body>
<!-- <svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
</svg> -->
<div class="wrapper">
	<div class="blur-film"></div>
	<header class="header">
		<div class="header-content">
			<div class="trapezoid-hdr2"></div>
			<div class="trapezoid-hdr"></div>
			<p>Zabawy matematyczne</p>
		</div>
	</header>

<div class="navigation">
	<nav class="nav">
		<ul class="menu">
			<form action="index.php">
			<li class="nav-item"><a href="home" class="nav_link">Strona główna</a></li>
			<li class="nav-item"><a href="konstruktor_mat" class="nav_link">Konstruktor matematyczny</a></li>
			<li class="nav-item"><a href="min_liczba" class="nav_link">Porównaj liczby</a></li>
			<li class="nav-item"><a href="przedzial" class="nav_link">Czy liczba jest w przedziale ?</a></li>
			</form>
		</ul>
	</nav>

	<div class="arrow-info">
		<div class="arrow-info-top"></div>
		<div class="arrow-info-bottom"></div>
	</div>
</div>

	<div class="content">

		<?php 
			require_once $link_to_page;
		?>
	</div>

</div>

	<script src="<?=$link_to_dir?>js/skrypt.js"></script>

	<footer class="footer">
		<div class="footer-title"><h3>Stronę przygotował: Rem Karablin</h3> </div>
	<!-- 
		1. pattern<a href='https://www.freepik.com/vectors/background'>Background vector created by starline - www.freepik.com</a>

		2. pattern<a href='https://www.freepik.com/vectors/background'>Background vector created by renata.s - www.freepik.com</a> 

		szacunek matematyka
		3. https://mathjs.org/
	-->
	</footer>
</body>
</html>