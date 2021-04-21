<?php 
$answer = "";
$inps = $_POST['inp'] ?? NULL;
if (isset($_POST['but_przedzial'])) {
	$execute = true;
	foreach ($inps as $key => $value) {
		if ($value == "") {
			$execute = false;
		}
	}
	if ($execute) {
		if ($inps[0] > $inps[1]) {
			$new_value = $inps[0];
			$inps[0] = $inps[1];
			$inps[1] = $new_value;
		}
		if ($inps[2] > $inps[0] && $inps[2] < $inps[1]) {

			$answer = "Liczba {$inps[2]} jest w przedziale";
		}else {
			$answer = "Liczba {$inps[2]} nie jest w przedziale";
		}
	}
}
?>
<style>
		.section_title {
		text-transform:uppercase;
		margin-top: 60px;
		font-family: sans-serif;
	}
	.cont_wrapped {
		float: left;
		margin-right: 50px;
	}
	.inp {
		border-radius: 6px;
		border: 1px solid #dbdddd;
		padding: 4px 10px;
		padding-right: 2px;
		outline:none;
	}
	.section_p {
		font-family: montserrat,serif;
	}
	.code_wrapped {
		position: relative;
		float: left;
		margin-top: 60px;
	}
	.div_code_script,.div_code_html {
		position: relative;
		display: block;
		margin-top: 10px;
		margin-bottom: 20px;
		border-radius: 6px;
		border: 1px solid #a0a0a0;
		background: rgba(255,255,255,0.6);
		float: left;
	}
</style>
<div class="main_content">

<div class="cont_wrapped">
	<h2 class="section_title">Czy liczba jest w przedziale ? (PHP)</h2>
	<p class="section_p">
	</p><br>
	<form action="przedzial" method="post">
		<input type="number" name="inp[]" class="inp" value="<?=$inps[0]?>"> Początek przedziału<br>
		<input type="number" name="inp[]" class="inp" value="<?=$inps[1]?>"> Koniec przedziału<br>
		<input type="number" name="inp[]" class="inp" value="<?=$inps[2]?>"> Liczba<br>
		<br>
		<button name="but_przedzial">Sprawdż</button>
	</form><br>
	<div class="odp"><?=$answer?></div>
</div>

<div class="code_wrapped">
	<button class="show_code" onclick="show_code()"><p>&lt;/&gt;</p></button><br>
	<div class="div_code_script">
		<p>&lt;php&gt;</p>
		<hr>
		<pre>
$answer ="";
$inps = $_POST['inp'];
if (isset($_POST['but_przedzial'])) {
	$execute = true;
	foreach ($inps as $key => $value) {
		if ($value == "") {
			$execute = false;
		}
	}
	if ($execute) {
		if ($inps[0] > $inps[1]) {
			$new_value = $inps[0];
			$inps[0] = $inps[1];
			$inps[1] = $new_value;
		}
		if ($inps[2] > $inps[0] && $inps[2] < $inps[1]) {

			$answer = "Liczba {$inps[2]} jest w przedziale";
		}else {
			$answer = "Liczba {$inps[2]} nie jest w przedziale";
		}
	}
}
		</pre>
	</div>
	<div class="div_code_html">
		<p>&lt;html&gt;</p>
		<hr>
<pre>
&lt;form action="przedzial" method="post">
&lt;input type="number" name="inp[]" class="inp" value="&lt;?=$inps[0]?&gt;"&gt; 
Początek przedziału&lt;br&gt;
&lt;input type="number" name="inp[]" class="inp" value="&lt;?=$inps[1]?&gt;"&gt; 
Koniec przedziału&lt;br&gt;
&lt;input type="number" name="inp[]" class="inp" value="&lt;?=$inps[2]?&gt;"&gt; 
Liczba&lt;br&gt;
&lt;button name="but_przedzial"&gt;Sprawdż&lt;/button&gt;
&lt;/form&gt;
</pre>
	</div>
</div>

<script>
	var open = true;
function show_code () {
	if (!open) {
		getEl('.div_code_script').style.display = 'block';
		getEl('.div_code_html').style.display = 'block';
		open = true;
	}else {
		getEl('.div_code_script').style.display = 'none';
		getEl('.div_code_html').style.display = 'none';
		open = false;
	}
}
</script>

</div>