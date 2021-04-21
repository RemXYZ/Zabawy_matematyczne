<!-- <div class="content"> -->
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
	<h2 class="section_title">Znajdż najmnieszą/największą liczbę (JS)</h2>
	<p class="section_p">
		Proszę wpisać do każdego pola cyfry, <br>algorytm automatycznie wyliczy najmniejszą liczbę z podanych
	</p><br>
	<input type="number" class="inp"><br>
	<input type="number" class="inp"><br>
	<input type="number" class="inp"><br>
	<input type="number" class="inp"><br>
	<input type="number" class="inp"><br>
	<div class="odp"></div>
</div>

<div class="code_wrapped">
<button class="show_code" onclick="show_code()"><p>&lt;/&gt;</p></button><br>
<div class="div_code_script"><p>&lt;script&gt;</p>
	<hr>
<pre>
const inps = getEl('.inp',1);
const odp = getEl('.odp');
const countMin = function (e) {
let status = {
	min:"",
	min_inp:"",
	max:"",
	max_inp:"",
	count:true
}
odp.innerHTML = "";
	for(let i=0;inps.length>i;i++) {
		if (inps[i].value == "") {
			status.count = false;
		}
		inps[i].style.border = "1px solid #dbdddd";
	}
	if (status.count == true) {
		status.min = inps[0].value;
		status.max = inps[0].value;
		status.min_inp = inps[0];
		status.max_inp = inps[0];
		for(let i=0;inps.length-1>=i;i++) {
			if (i != 0 && status.min > Number(inps[i].value)) {
				status.min = Number(inps[i].value);
				status.min_inp = inps[i];
			}
			if (status.max < Number(inps[i].value)) {
				status.max = Number(inps[i].value);
				status.max_inp = inps[i];
			}
		}
		odp.innerHTML = `
		&lt;p style="color:#23ad16;"&gt; Min:${status.min}&lt;/p&gt;
		&lt;p style="color:#a84721;">Max:${status.max}&lt;/p&gt;`;
		status.min_inp.style.border = "1px solid #23ad16";
		status.max_inp.style.border = "1px solid #a84721";
	}
}

for (const [key, value] of Object.entries(inps)) {
  value.addEventListener("keyup",countMin);
  value.addEventListener("change",countMin);
}</pre></div>
<div class="div_code_html">
	<p>&lt;html&gt;</p>
	<hr>
	<pre>
&lt;input type="number" class="inp"&gt;&lt;br&gt;
&lt;input type="number" class="inp"&gt;&lt;br&gt;
&lt;input type="number" class="inp"&gt;&lt;br&gt;
&lt;input type="number" class="inp"&gt;&lt;br&gt;
&lt;input type="number" class="inp"&gt;&lt;br&gt;
&lt;div class="odp"&gt; &lt;/div&gt;
</pre></div>
</div>



<script>
const inps = getEl('.inp',1);
const odp = getEl('.odp');
const countMin = function (e) {
let status = {
	min:"",
	min_inp:"",
	max:"",
	max_inp:"",
	count:true
}
odp.innerHTML = "";
	for(let i=0;inps.length>i;i++) {
		if (inps[i].value == "") {
			status.count = false;
		}
		inps[i].style.border = "1px solid #dbdddd";
	}
	if (status.count == true) {
		status.min = inps[0].value;
		status.max = inps[0].value;
		status.min_inp = inps[0];
		status.max_inp = inps[0];
		for(let i=0;inps.length-1>=i;i++) {
			if (i != 0 && status.min > Number(inps[i].value)) {
				status.min = Number(inps[i].value);
				status.min_inp = inps[i];
			}
			if (status.max < Number(inps[i].value)) {
				status.max = Number(inps[i].value);
				status.max_inp = inps[i];
			}
		}
		odp.innerHTML = `
		<p style="color:#23ad16;"> Min:${status.min}</p>
		<p style="color:#a84721;">Max:${status.max}</p>
		`;
		status.min_inp.style.border = "1px solid #23ad16";
		status.max_inp.style.border = "1px solid #a84721";
	}
}

for (const [key, value] of Object.entries(inps)) {
  value.addEventListener("keyup",countMin);
  value.addEventListener("change",countMin);
}

// Object.keys(inps).forEach( function(el, i) {
// 	inps[el].addEventListener("keyup",countMin);
// 	inps[el].addEventListener("change",countMin);
// });

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


//PRZYKLADY
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries

// const nameValue = 'Name2';
// const obj = {
//   1:  'Name1',
//   2: 'Name2'
// }
// let hmm = Object.entries(obj).find(n => n[1] === nameValue)?.[0]

// console.log(hmm)
// for (const [key, value] of Object.entries(object1)) {
//   console.log(`${key}: ${value}`);
// }

</script>
</div>
<!-- </div> -->