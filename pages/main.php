<!-- <div class="content"> -->
	<div class="main_content">
		<div class="home_wrapper">
			<div class="home-title">Dzień dobry !</div>
			<p class="home-text">
				Wersja strony internetowej: 2.0<br>
				Witryna używa plików cookie. 
				</p>
				<form action="index.php" method="post"><button name="delete_ck">Usunąnć cookie</button></form><br><br>
			<p class="home-text">
				Zacząłem tworzyć tę stronę 18.03.2021, a wersję 2 skończyłem 06.04.2021, w całości spędziłem około 67 godzin. Zycznając od 29.03.2021 skupiłem się tylko na konstruktorze matematycznym. Cały skrypt, stronę i obrazy zrobiłem sam (każde źrudło podpisałem, że to jest źrudło), dlatego u mnie wyszło tyle czasu. Ale naprawde dużo czego się nauczyłem, i bardzo jestem zadowalony z tego, że dużo razy udało mi się użyć styl obiektowy w JS<br>
				<br>W drugiej wersji zrobiłem: <br>
				1.Linię która łączy nody, robiąc tę linię używałem dużo wzorów matematycznych, głównie cos i sin, ponieważ linia podąża za kursorem, i według tego zmienia swój kąt;<br>
				2.Podłączenie jednego noda do drugiego;<br>
				3.Obsługę podłączonego noda, czyli jeśli ruszam nod, to linia będzie podążać za gniazdem;<br>
				4.Możliwóść komunikowania się między nodami, czyli jeśli wpiszę coś w jeden nod, to zmieni się zawartość węzła podrzędnego;<br>
			</p><br>
			<div class="home-title">Htaccess</div>
			<p class="home-text">
				Plik .htaccess służy do tego, żeby strona nie szukała katalogów, które nie istnieją. <br>
				np. jeśli z wyłączonym trybem .htaccess wyszukać w URLu /home/catalogs, to zostanę na tej samej stronie, lecz w tedy pliki css i js<br> podłączone zewnętrznie nie będą działać. To się przyda w przyszłości.
			</p>
			<br>
			<form action="php/turn_on_htaccess.php" method="post">
				<button name="turn_on_htaccess">Włączyć tryb .htaccess</button>
			</form><br>
			<h3>A tutorial for the math constructor</h3>
			<h3>Poradnik do konstruktora matematycznego</h3>
			<video src="<?=$link_to_dir?>img/tutorial.mp4" width="480" height="270" poster="poster.gif" controls></video>
		</div>
	</div>
<!-- </div> -->