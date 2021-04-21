//!!!
//The whole script was written by an individual Rem Karablin except for sources that are highlighted as //sourse [url] ... //sourceEnd
//!!!
//GET ELEMENT 
function getEl (mix,arr) {
	let result = document.querySelectorAll(mix);
	if (result.length < 2 && arr != "1") {
		return result[0];
	}
	return result;
}

//CSS STYLE OF ELEMENT
Object.prototype.CSSinfo =  function() {
return window.getComputedStyle(this,null);
}

Object.prototype.setCSS = function (mix,arg2) {
	if (typeof mix == "object") {
		for (const [key, value] of Object.entries(mix)) {
			this.style[key] = value;
		}
	}else if (typeof mix == "string" && typeof arg2 == "string") {
		this.style[mix] = arg2;
	}
}
//Find top element
Object.prototype.find_top_node = function (mix) {
let el_par = this,
stop = true;
while(stop) {
	el_par = el_par.parentNode;
	if (!el_par.classList.contains(mix) || el_par.id != mix) {
		let el_chd = el_par.children;
		for (let chld of el_chd) {
			if (chld.classList.contains(mix) || chld.id == mix) {
				return chld;
				stop = false;
			}
		}
	}else {
		return el_par;
		break;
	}
	if (el_par == document.body) {
		stop = false;
	}
}
}

//CREATE ELEMENT
function crtEl (tag,att) {
	let node = document.createElement(tag);
	if (typeof att == 'object') {
		for(var key in att) {
			if (att.hasOwnProperty(key)){
				node.setAttribute(key,att[key]);
			}
		}
	}
	return node;
}

//DRAG AND DROP PART

//D_D it's function for start Drag&drop elements
//element has to be DOM object, with style : postition absolute!
//parent of element has to be DOM object


function geElCrd (el) {
	var el = {
		X:getCoords(el).left,
		Y:getCoords(el).top,
		x:el.offsetLeft,
		y:el.offsetTop,
		w:el.clientWidth,
		h:el.clientHeight,
		'x_bd':function(){return this.x+this.w},
		'y_bd':function(){return this.y+this.h}
	}
	return el;
}

// Drag&Drop PART

function internalColision (el,speedX,speedY,par) {

let speed = {
x:speedX,
y:speedY
}

let outSpeed = {
	X:0,
	Y:0
}

let parCrd = geElCrd(par);

let elCrd = {
	X:getCoords(el).left,
	Y:getCoords(el).top,
	x:getCoords(el).left - parCrd.X - (par.offsetWidth - par.clientWidth)/2,
	y:getCoords(el).top - parCrd.Y - (par.offsetWidth - par.clientWidth)/2,
	w:el.offsetWidth,
	h:el.offsetHeight,
	moveXL: true,
	moveXR: true,
	moveYB: true,
	moveYT: true
	}


// total displacement
let tldp = {
	x: elCrd.x + elCrd.w + speed.x,
	y: elCrd.y + elCrd.h + speed.y
}

//collision calculation

if (tldp.x >= parCrd.w) {
	outSpeed.X = speed.x - (tldp.x - parCrd.w);
	elCrd.moveXL = false;
} 
if (elCrd.x + speed.x <= 0) {
	outSpeed.X = speed.x - (elCrd.x + speed.x);
	elCrd.moveXR = false;
} 

if (tldp.y >= parCrd.h) {
	outSpeed.Y = speed.y - (tldp.y - parCrd.h);
	elCrd.moveYB = false;
}
if (elCrd.y + speed.y < 0) {
	outSpeed.Y = speed.y - (elCrd.y + speed.y);
	elCrd.moveYT = false;
}


//speed entry 

if (speed.x > 0 && elCrd.moveXL ) {
	outSpeed.X += speed.x;
}
if (speed.x < 0 && elCrd.moveXR ) {
	outSpeed.X += speed.x;
}

if (speed.y > 0 && elCrd.moveYB ) {
	outSpeed.Y += speed.y;
}
if (speed.y < 0 && elCrd.moveYT ) {
	outSpeed.Y += speed.y;
}

return {
	x:outSpeed.X,
	y:outSpeed.Y
}

}

let isResizing = false;
let isDraging = false;

//D_D it's function for start Drag&drop elements

function D_D (main_el,par,pos_x,pos_y,def_el,fdfex) {
//main_el is a trigger, elemet that start drag&drop
//par is for collision, so element can't go out of parent
//with pos_x and pos_y you can set position for element
//with def_el you can move another element
//*fdfex is a function definition expression. And a function definition expression it is a function is passed as an argument to another function

let el = main_el;
el.setAttribute('onselectstart',"return false");

el.addEventListener('mousedown',mdD_D);

if (def_el !== undefined && def_el != 0 && def_el != ""){
	el = def_el;
}

if (pos_x !== undefined && !isNaN(pos_x)) {
	el.style.left = Number(pos_x)+"px";
}
if (pos_y !== undefined && !isNaN(pos_x)) {
	el.style.top = Number(pos_y)+"px";
}

function mdD_D (e) {
	window.addEventListener('mousemove',mvD_D);
	window.addEventListener('mouseup',muD_D);

	let elCrd = {
		x:el.offsetLeft,
		y:el.offsetTop,
		w:el.offsetWidth,
		h:el.offsetHeight
	}

	let mouse = {
		x:e.x,
		y:e.y
	}

	if (e.target != this & e.target.tagName != "svg" & e.target.tagName != "line") {
		window.removeEventListener('mousemove',mvD_D);

	}else {
		el.style.boxShadow = "0 0 5px 2px #b3e0f9";
	}

	function mvD_D (e) {

if (!isResizing){

mouse.x = e.x - mouse.x;
mouse.y = e.y - mouse.y;

if (par) {
//this if is for collision with parent
let speed = internalColision (el,mouse.x,mouse.y,par);
//and this for change coords of element
elCrd.x += speed.x;
elCrd.y += speed.y;

}else {
	elCrd.x += mouse.x;
	elCrd.y += mouse.y;
}

		elCrd.X = getCoords(el).left;
		elCrd.Y = getCoords(el).top;

//here I set another position of element with css
		if (fdfex !== undefined && fdfex !== "" && fdfex !== 0) {
			let status = 1;
			if (typeof fdfex == "function") {
				fdfex(e,status);
			}
			if (typeof fdfex == "object") {
				let move = fdfex.f(e,fdfex.arg,status,elCrd.X,elCrd.Y);
			}
		}

		el.style.left = elCrd.x + "px";
		el.style.top = elCrd.y + "px";
		mouse.x = e.x;
		mouse.y = e.y;
}

	}

function muD_D (e) {
	window.removeEventListener('mousemove',mvD_D);
	window.removeEventListener('mouseup',muD_D);

//here I set another position of element with css

	if (fdfex !== undefined && fdfex !== "" && fdfex !== 0) {
		let status = 0;
		if (typeof fdfex == "function") {
			fdfex(e,status);
		}
		if (typeof fdfex == "object") {
			let change = fdfex.f(e,fdfex.arg,status,e.x,e.y);
		}
	}

	el.style.boxShadow = "none";
	isDraging = false;
	}
}

el.ondragstart = function() {
  return false;
};

}

//source https://learn.javascript.ru/coordinates-document

// function getCoords(elem) { // кроме IE8-
//   var box = elem.getBoundingClientRect();

//   return {
//     top: box.top + pageYOffset,
//     left: box.left + pageXOffset
//   };

// }

function getCoords(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: top,
    left: left
  };
}

//sourseEnd