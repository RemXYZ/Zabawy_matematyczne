const content = getEl('.content');
var nav = getEl('.navigation');
const main_div = getEl('.wrapper');

var nav_W = "";
// var cont_W = 0;
win_resize();


function win_resize() {
	nav_W = nav.CSSinfo().width;
	nav_L = nav.CSSinfo().left;
	content.style.left = parseInt(nav_W,10)+parseInt(nav_L,10)+"px";
	let cont_H = content.offsetHeight+parseInt(content.CSSinfo()['margin-top'],10)+parseInt(content.CSSinfo()['margin-bottom'],10);
	// cont_H = 0;
	if (cont_H > window.innerHeight) {
	main_div.style.height = cont_H+"px";
	}
	// W_for_cont = window.innerWidth - parseInt(nav_W,10);
	// content.style.width = W_for_cont-W_for_cont*0.02+"px";
}


window.onresize = win_resize;






const nav_arrow_but = {
	"el":getEl('.arrow-info'),
	"enabled":false
}

// function change_bgClr_a (el,color,time) {
// 	setTimeout(()=>{el.style.background = color},time);
// }

nav_arrow_but.el.addEventListener("click",function() {
	if (!this.enabled) {
		let el = this,
		deg = 0,
		cont_left = parseInt(content.CSSinfo().left,10);
		nav_left = 0;
		content.style.left = cont_left+"px";

//TO CHANGE LEFT OF NAV

	if (parseInt(nav_W,10) <= 320) {

		let navIntr = setInterval(()=>{
			nav_left+=10;
			nav.style.left = -1*nav_left+"px";
			if (nav_left >= 260) {
				clearInterval(navIntr);
			}

			// cont_left-= 10;
			// content.style.left = cont_left+"px";
			// if (cont_left <= 70) {
			// 	content.style.left = 70+"px";
			// 	// W_for_cont = window.innerWidth - 70;
			// 	// content.style.width = W_for_cont-W_for_cont*0.02+"px";
			// }

		},20);
	}else {
		let navIntr = setInterval(()=>{
			nav_left++;
			nav.style.left = -1*nav_left+"vw";
			if (nav_left >= 16) {
				clearInterval(navIntr);
			}
		},20);
	}


		//TO CHANGE ROTATION FOR ARROW
		let degIntr = setInterval(()=>{
			deg+= 2;
			el.style.transform = "rotate("+deg+"deg)";
			if (deg >= 180) {
				clearInterval(degIntr);
			}
		},2);

		//TO CHANGE LEFT OF CONTENT
		let cont_left_Intr = setInterval(()=>{

			cont_left-= 10;
			content.style.left = cont_left+"px";
			if (cont_left <= 70) {
				clearInterval(cont_left_Intr);
				// content.style.left = 70+"px";
				// W_for_cont = window.innerWidth - 70;
				// content.style.width = W_for_cont-W_for_cont*0.02+"px";
			}

		},20);


		this.enabled = true;


	}else {
		let el = this,
		deg = 180;
	if (parseInt(nav_W,10) <= 320) {
		let nav_left = 260;
		let navIntr = setInterval(()=>{
			nav_left-=10;
			nav.style.left = -1*nav_left+"px";
			if (nav_left <= 0) {
				clearInterval(navIntr);
			}
		},10);
	}else {
		let nav_left = 16;
		let navIntr = setInterval(()=>{
			nav_left--;
			nav.style.left = -1*nav_left+"vw";
			if (nav_left <= 0) {
				clearInterval(navIntr);
			}
		},20);
	}



		let degIntr = setInterval(()=>{
			deg-=2;
			el.style.transform = "rotate("+deg+"deg)";
			if (deg <= 0) {
				clearInterval(degIntr);
			}
		},2);

		W_for_cont = window.innerWidth - parseInt(nav_W,10);
		content.style.left = parseInt(nav_W,10)+"px";

		this.enabled = false;
	}

// change_bgClr_a (this,"#c5eaf7",5000);
});