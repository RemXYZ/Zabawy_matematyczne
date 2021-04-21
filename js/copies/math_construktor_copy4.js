//!!! The whole plik was written by Rem Karablin !!!

const math_nodes = {};

class Math_node {

constructor(type,x,y) {
	this.type = type;
	this.el = {};
	this.el.posX = x;
	this.el.posY = y;
	this.el.socket_box_top = {};
	this.el.socket_box_bot = {};
	this.id = Object.keys(math_nodes).length;
	this.name_id = "node_"+this.id;
	this.sockets = {};
}

add(box_place,node_pattern) {
	const el = {};
	if (node_pattern !== undefined) {
		this.$el = node_pattern.cloneNode(true);
	}else {
		this.$el = undefined;
		console.error("The second element is undefined, this element has to be a 'pattern' for creating a new node");
	}
	this.el.cont = this.$el.querySelector(".node_content");
	this.el.name = this.$el.querySelector(".node_name");
	this.el.socket_box_top.el = this.$el.querySelector(".node_connection_box_top");
	this.el.socket_box_top.zI = 10;
	this.el.socket_box_top.el.setCSS("z-index",10);

	this.el.socket_box_bot.el = this.$el.querySelector(".node_connection_box_bot");
	this.el.socket_box_bot.zI = 10;
	this.el.socket_box_bot.el.setCSS("z-index",10);



	//*Give to node ID
	this.$el.setAttribute("id",this.name_id);
	//*ADDING THIS NODE to box_place
	box_place.append(this.$el);
	D_D(this.$el,box_place,this.el.posX,this.el.posY);
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
	//*instukcja kontaktów
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
		"node_id":this.name_id,
		flow:flow,
		type:type,
	}
	//new_socket_name it's can be the socket_0 or socket_1
	let socket = crtEl("div",this.sockets[new_socket_name]);
	socket.setCSS({"background":sck_info.background,"border":sck_info.border});

	let node_line = crtEl("div",{"class":"line_origin"});

	if (flow == "input") {
		node_line.setCSS({"top":"0"});
	}
	
	// node_line.innerHTML = '<svg width="200" height="200" class="math_node_svg_line"><line x1="0" y1="0" x2="200" y2="190" style="stroke:rgb(196, 196, 196);stroke-width:2"></line></svg>';

	// const ns = 'http://www.w3.org/2000/svg';

	// let line_svg = document.createElementNS(ns,"svg");
	// 	line_svg.setAttribute("width","0");
	// 	line_svg.setAttribute("height","0");
	// 	line_svg.setAttribute("class","math_node_svg_line");
		
	// let line = document.createElementNS(ns,"line");
	// 	line.setAttribute('x1',"0");
	// 	line.setAttribute('y1',"0");
	// 	line.setAttribute('x2',"0");
	// 	line.setAttribute('y2',"0");
	// 	line.setAttribute('style',"stroke:rgb(196, 196, 196); stroke-width:2");

	// line_svg.append(line);
	// node_line.append(line_svg);

	let line = crtEl("div",{"class":"line"});

	node_line.append(line);
	socket.append(node_line);

	this.sockets[new_socket_name].$el = socket;
	// this.sockets[new_socket_name].zIndex=10;

	return {'el':socket,'name':new_socket_name};
}

getSocketCrd (el,name) {
	//*crds = coordinates
	//*x_bd = x border
	this.sockets[name].crds = {
		'x':getCoords(el).left,
		'y':getCoords(el).top,
		'w':el.offsetWidth,
		'h':el.offsetHeight,
		'x_bd':function(){return this.x+this.w},
		'y_bd':function(){return this.y+this.h},
	}
	// let hi = this.el.socket_box_top.el.querySelector("#"+name)
	// console.log(hi)
	// console.log(this.sockets[name].crds.x_bd())
	// console.log(getCoords(hi))
}

add_sockets(type) {

	let s_info = this.sockets_info();

	const sockets = {
		//*Here I can specify,what type of node, which socket I want to instal and how many
		'input':{input:[s_info.value,s_info.types],output:[s_info.value]}
	}

	for (let key in sockets) {
		if (key == type) {
			//INPUT PART
			for (let i=0;sockets[key].input.length>i;i++) {
				let new_socket = this.create_socket(sockets[key].input[i],'input',sockets[key].input[i].type);
				this.el.socket_box_top.el.append(new_socket.el);
				this.getSocketCrd(new_socket.el,new_socket.name);

				let line = new_socket.el.querySelector(".line");
				
				move_line(new_socket.el,line,{'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt});
			}
			//OUTPUT PART
			for (let i=0;sockets[key].output.length>i;i++) {
				let new_socket = this.create_socket(sockets[key].input[i],'output',sockets[key].input[i].type);
				this.el.socket_box_bot.el.append(new_socket.el);
				this.getSocketCrd(new_socket.el,new_socket.name);

				let line = new_socket.el.querySelector(".line");
				
				move_line(new_socket.el,line,{'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt});
			}
		}
	}

}

//*END OF CLASS MATH_NODE;
}
//*END OF CLASS MATH_NODE;


//*function definition expression it is a function is passed as an argument to another function
//*function definition expression to funkcja ktora jest zagniezdzona w drugiej funkcji
var cut_line = true;
var found_socket = undefined;
function Fdfex_conect_sckt (e,status,obj,x,y){
	//*obj is {'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt}
	//* If the status is 1,then we are moving and searching another socket, also event is mousemove
	//* If the status is 0,then we stopped and event is mouseup
	let my_node = obj.node;
	if (status == 1) {
		cut_line = true;
		found_socket = undefined;
		for (const [key,value] of Object.entries(math_nodes)) {
			//*obj.node.name_id it is my node, it is me
			if (key != my_node.name_id) {
				Object.keys(math_nodes[key].sockets).forEach(function(el,i) {
					let oth_node = math_nodes[key];
					//*changing crds of the socket
					math_nodes[key].getSocketCrd(oth_node.sockets[el].$el,el)
					//*searching for the required socket
					if (
						oth_node.sockets[el].crds.x <= e.x &&
						oth_node.sockets[el].crds.y <= e.y &&
						oth_node.sockets[el].crds.x_bd() >= e.x &&
						oth_node.sockets[el].crds.y_bd() >= e.y
						) {
						//*end of searching
						if (my_node.el.socket_box_top.zI <= oth_node.el.socket_box_top.zI ||
							my_node.el.socket_box_bot.zI <= oth_node.el.socket_box_bot.zI) {
						var skt_z = oth_node.el.socket_box_bot.zI+1;
						obj.node.el.socket_box_top.el.style.zIndex = skt_z;
						obj.node.el.socket_box_bot.el.style.zIndex = skt_z;
						}
						if (
							((obj.socket.flow == 'output' 
							&& oth_node.sockets[el].flow == "input")
							|| (obj.socket.flow == 'input' 
							&& oth_node.sockets[el].flow == "output"))
							&& obj.socket.type == oth_node.sockets[el].type 
							) {
							cut_line = false;
							found_socket = {"node":oth_node,"socket":oth_node.sockets[el],"crds":{'x':x,"y":y}};
						}	
					}
					
				});
			}
		}
	}

	if (status == 0) {
		//*jesli na kursorze nie ma potrzebnego socketa, to odcinamy linije
		if (cut_line) {
			var skt_z = obj.node.el.socket_box_top.zI;
			obj.node.el.socket_box_top.el.style.zIndex = skt_z;
			obj.node.el.socket_box_bot.el.style.zIndex = skt_z;
			if (obj.socket.connections !== undefined && obj.socket.connections != ""){
				obj.socket.connections.socket.connections = "";
				obj.socket.connections = "";
			}
		}else {
			if (found_socket !== undefined) {
				obj.socket.connections = found_socket;
				found_socket.socket.connections = {
					"node":my_node,
					"socket":obj.socket,
					"crds":{"x":obj.socket.crds.x,"y":obj.socket.crds.y}
				}
				console.log(my_node)
			}
		}
		console.log("hi")
		return cut_line;
	}
	
}

let node ="";

function add_math_node(box_place,node_type,node_pattern,crd_obj){
	// const node = new Math_node(node_type);

	if (crd_obj === undefined) {
		crd_obj= {"x":0,"y":0};
	}
	
	node = new Math_node(node_type,crd_obj.x,crd_obj.y);
	node.add(box_place,node_pattern);
	node.add_content(node_type);

	// node.hello = hello.bind(node);
	// node.hello("lol")
	// console.log(node)



	//*WRITING INFORMATION ABOUT THIS NODE IN the object: math_nodes
	//*ZAPISUJE INFORMACJE O TYM NODZIE W objekcie: math_nodes
	//*ЗАПИСЫВАЮ ИНФОРМАЦИЮ ОБ ЭТОМ НОДЕ В объекте: math_nodes
	let node_id = node.name_id;
	math_nodes[node_id] = node;

}

window.onload = ()=> {
add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0]);

add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0],{"x":200,"y":100});
}



//*THIS FUNCTION WILL START MOVE THE LINE
function move_line(el,line,fdfex) {
	//* node is the object, where we can change some 
	el.addEventListener("mousedown",function() {m_downD_D_line(event,el,line,fdfex)});

}



function cos_deg (angle) {
	return Number(Math.cos(angle*Math.PI/180).toFixed(4));
}
function sin_deg (angle) {
	return Number(Math.sin(angle*Math.PI/180).toFixed(4));
}


//*this function will calculate angle e.g. for line
function find_angle_tgmt (x,y) {
	
	//Checking...
	if (Number.isNaN(Number(x))  || Number.isNaN(Number(x)) || x === undefined || y === undefined) {
		console.error("The value must be a number and can't be undefined");
		return false;
	}
	//*Pythagoras' theorem
	//*Szukam r (promien) za pomoca tw. Pitagorasa
	//*Ищу r (радиус) с помощью теоремы Пифагора
	let r = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
	r = Number(r.toFixed(4));
	//*Szukam kat linii za pomoca cos, poniewaz deg jest skierowany w prawa strone (w dol)
	
	let cosalfa =  x/r;
	let sinalfa = y/r;



for (let angle = 0; 90>=angle;angle++) {
	if (x>0 && y < 0) {
	var x_v = cos_deg(angle);
		if (Math.abs(cosalfa)>=x_v) {
			var x_v2 = cos_deg(angle-1);
			let pct = (x_v2-cosalfa)/(x_v2-x_v);
			return {"value":cosalfa,"deg":angle-1+pct,"r":r};
			break;
		}
	}
	if (x<=0 && y<0) {
		var x_v = sin_deg(angle);
		if (Math.abs(cosalfa)<=x_v) {
			var x_v2 = sin_deg(angle-1);
			let pct = (x_v2-Math.abs(cosalfa))/(x_v2-x_v);
			return {"value":cosalfa,"deg":90+angle-1+pct,"r":r};
			break;
		}
	}
	if (x<0 && y>=0) {
		var x_v = sin_deg(angle);
		if (Math.abs(sinalfa)<=x_v) {
			var x_v2 = sin_deg(angle-1);
			let pct = (x_v2-Math.abs(sinalfa))/(x_v2-x_v);
			return {"value":sinalfa,"deg":180+angle-1+pct,"r":r};
			break;
		}
	}
	if (x>=0 && y>0) {
		var x_v = sin_deg(angle);
		if (Math.abs(cosalfa)<=x_v) {
			var x_v2 = sin_deg(angle-1);
			let pct = (x_v2-Math.abs(cosalfa))/(x_v2-x_v);
			// return {"value":sinalfa,"x_v":x_v,"x_v2":x_v2,"percent":pct,"deg":270+angle-1+pct,"deg2":angle,"r":r};
			return {"value":sinalfa,"deg":270+angle-1+pct,"r":r};
			break;
		}
	}


}
	
	// if (x<=0 && y<0) {
	// 	return {"value":0,"deg":90,"r":r};
	// }
	// if (x<0 && y>=0) {
	// 	return {"value":0,"deg":180,"r":r};
	// }
	// if (x>=0 && y>0) {
	// 	return {"value":0,"deg":270,"r":r};
	// }
	return {"value":0,"deg":0,"r":r};

}

//*this function will calculate how to move the line
function m_downD_D_line (e,element,line,fdfex) {
//* e is event
//* element is the element that will start to move the line
//* line is the element that will move
const el = element;
//* el is element because in the future we will can set another element

	window.addEventListener("mousemove",m_moveD_D);
	window.addEventListener("mouseup",m_upD_D);

	// const mouse = {
	// 	"x":e.x,
	// 	"y":e.y
	// }
	function F_objCrd (el) {
		return {
			x:getCoords(el).left,
			y:getCoords(el).top,
			w:el.offsetWidth,
			h:el.offsetHeight
		}
	}

	const lineCrd = F_objCrd(line);
	const elCrd = F_objCrd(el);

	function m_moveD_D (e) {
		// mouse.x = e.x - mouse.x;
		// mouse.y = e.y - mouse.y;
		let crdX = e.x - lineCrd.x - window.pageXOffset;
		let crdY = lineCrd.y - e.y - window.pageYOffset;

		var tgmt_arg = find_angle_tgmt (crdX,crdY);
		lineCrd.w = tgmt_arg.r;
		line.style.width = lineCrd.w + "px";
		line.style.transform = "rotate("+tgmt_arg.deg+"deg)";

//on mouse movement I run another function
//при движении мыши, я запускаю другую функцию
		if (fdfex !== undefined) {
			fdfex.f(e,1,fdfex.arg,crdX,crdY);
		}

		// mouse.x = e.x;
		// mouse.y = e.y;
	}
	

	function m_upD_D (e) {
		window.removeEventListener("mousemove",m_moveD_D);
		window.removeEventListener("mouseup",m_upD_D);
		if (fdfex !== undefined) {
			let cut_line = fdfex.f(e,0,fdfex.arg);
			if (cut_line) {
				// console.log(line)
				line.style.width = 0 + "px";
			}
		}	
	}

}