//!!! The whole plik was written by Rem Karablin !!!
const math_nodes = {};

class Math_node {

constructor(type) {
	this.type = type;
	this.el = {};
	this.id = Object.keys(math_nodes).length;
	this.sockets = {};
}

add(box_place,node_pattern) {
	const el = {};
	if (node_pattern !== undefined) {
		this.$el = node_pattern.cloneNode(true);
	}else {
		this.el.$el = undefined;
		return false;
	}
	this.el.cont = this.$el.querySelector(".node_content");
	this.el.name = this.$el.querySelector(".node_name");
	this.el.socket_box_top = this.$el.querySelector(".node_connection_box_top");
	this.el.socket_box_bot = this.$el.querySelector(".node_connection_box_bot");

	//ADDING THIS NODE to box_place
	box_place.append(this.$el);
	D_D(this.$el,box_place);
}

add_content(type) {
	if (type == "input") {
		this.el.cont_node = crtEl("input",{"type":"number","class":"node_inp"});
	}

	this.el.cont.append(this.el.cont_node);
	this.el.name.innerHTML = type;
	this.add_sockets(type);
}

sockets_info () {
	//instukcja kontaktów
	const s_info = {
		value:{
			background:'#c2c3c4',
			border:'2px solid #aeb0b2',
			type:"value"
		},
		types:{
			background:'#1ca533',
			border:'2px solid #149129',
			type:"types"
		}
	}
	return s_info;
}

create_socket(which,flow,type) {
	let sck_info = which;

	let qt_of_sck = Object.keys(this.sockets).length;
	let new_socket_name = "socket_"+qt_of_sck;

	this.sockets[new_socket_name] = {
		"class":"node_connection",
		"id":new_socket_name,
		flow:flow,
		type:type
	}

	let socket = crtEl("div",this.sockets[new_socket_name]);
	socket.setCSS({"background":sck_info.background,"border":sck_info.border});

	let node_line = crtEl("div",{"class":"node_line"});
	
	// node_line.innerHTML = '<svg width="200" height="200" class="math_node_svg_line"><line x1="0" y1="0" x2="200" y2="190" style="stroke:rgb(196, 196, 196);stroke-width:2"></line></svg>';

	const ns = 'http://www.w3.org/2000/svg';

	let line_svg = document.createElementNS(ns,"svg");
		line_svg.setAttribute("width","0");
		line_svg.setAttribute("height","0");
		line_svg.setAttribute("class","math_node_svg_line");
		
	let line = document.createElementNS(ns,"line");
		line.setAttribute('x1',"0");
		line.setAttribute('y1',"0");
		line.setAttribute('x2',"0");
		line.setAttribute('y2',"0");
		line.setAttribute('style',"stroke:rgb(196, 196, 196); stroke-width:2");

	line_svg.append(line);
	node_line.append(line_svg);
	socket.append(node_line);

	this.sockets[new_socket_name].$el = socket;

	return {'el':socket,'name':new_socket_name};
}

getSocketCrd (el,name) {
	//crds = coordinates
	//x_bd = x border
	this.sockets[name].crds = {
		'x':getCoords(el).left,
		'y':getCoords(el).top,
		'w':el.offsetWidth,
		'h':el.offsetHeight,
		'x_bd':function(){return this.x+this.w},
		'y_bd':function(){return this.y+this.h},
	}
}

add_sockets(type) {

	let s_info = this.sockets_info();

	const sockets = {
		input:{input:[s_info.value,s_info.types],output:[s_info.value]}
	}

	for (let key in sockets) {
		if (key == type) {
			//INPUT PART
			for (let i=0;sockets[key].input.length>i;i++) {
				let new_socket = this.create_socket(sockets[key].input[i],'input',sockets[key].input[i].type);
				this.el.socket_box_top.append(new_socket.el);
				this.getSocketCrd(new_socket.el,new_socket.name);

				let svg = new_socket.el.querySelector(".math_node_svg_line");
				move_line(svg,new_socket.el,"svg");
			}
			//OUTPUT PART
			for (let i=0;sockets[key].output.length>i;i++) {
				let new_socket = this.create_socket(sockets[key].input[i],'output',type);
				this.el.socket_box_bot.append(new_socket.el);
				this.getSocketCrd(new_socket.el,new_socket.name);
			}
		}
	}

}


}
//END OF CLASS MATH_NODE;

class Hi extends Math_node {
	hi () {
		console.log("hi")
	}
}

//THIS FUNCTION WILL MOVE LINE
function move_line (element,trigger_node,mode) {

	const el = element,
	trig = trigger_node;
	if (mode == 'svg' || mode === undefined) {
		var line = el.querySelector("line");
		if (line === undefined) {
			return false;
		}
	}

	trig.addEventListener("mousedown",m_down_D_D);

	function m_down_D_D (e) {
		
	}


}

function hello (wow) {
console.log("О hello there !")
this.haha = "XD"
this.hoho = wow;
}

hello.prototype = {
	enumerable: true,
    configurable: true,
    writable: true
}


let node ="";

function add_math_node(box_place,node_type,node_pattern){
	// const node = new Math_node(node_type);
	node = new Math_node(node_type);
	node.add(box_place,node_pattern);
	node.add_content(node_type);

	node.hello = hello.bind(node);
	node.hello("lol")
	console.log(node)



	//WRITING INFORMATION ABOUT THIS NODE IN the object: math_nodes
	//ZAPISUJE INFORMACJE O TYM NODZIE W objekcie: math_nodes
	//ЗАПИСЫВАЮ ИНФОРМАЦИЮ ОБ ЭТОМ НОДЕ В объекте: math_nodes
	let node_id = "node_"+node.id;
	node.$el.setAttribute("id",node_id);
	math_nodes[node_id] = node;

}

window.onload = ()=> {
add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0]);
}