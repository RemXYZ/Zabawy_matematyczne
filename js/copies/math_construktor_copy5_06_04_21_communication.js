//!!! The whole plik was written by Rem Karablin !!!
//* a comment with star is a comment with text
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
	D_D(this.$el,box_place,this.el.posX,this.el.posY,0,{"arg":this,"f":keepConnection});
}

sockets_info () {
	//*instukcja kontaktów
	const s_info = {
		value:{
			background:'#c2c3c4',
			border:'2px solid #aeb0b2',
			type:"value",
			c_instruction:function () {
				return {
					"tag":"input",
					"change_value":true,
					"value":"value",
					"change_attr":false,
					"attr":"",
					"change_var":false,
					"var":""
				}
			}
		},
		types:{
			background:'#1ca533',
			border:'2px solid #149129',
			type:"types",
			c_instruction:function () {
				return {
					"tag":"select",
					"change_value":false,
					"value":"value",
					"change_attr":true,
					"attr":"type",
					"change_var":false,
					"var":""
				}
			}
		}
	}
	return s_info;
}

BD_of_nodes () {
let type = this.type;
let s_info = this.sockets_info();
	let nodes = {
		"input":{
			"create":function() {
				return crtEl("input",{"type":"number","class":"node_inp"});
			},
		//*Here I can specify,what type of node, which socket I want to instal and how many
		'sockets':{input:[s_info.value,s_info.types],output:[s_info.value]}
		},
		"type":{
			"create":function() {
				let selector = crtEl("select",{"class":"type_selector_node"});
				let options = {
					"num":function() {let o = crtEl("option",{"value":"number"}); o.innerHTML = "Number"; return o },
					"txt":function() {let o = crtEl("option",{"value":"text"});o.innerHTML = "Text"; return o}
				}
				selector.append(options.num());
				selector.append(options.txt());
				return selector;
			},
		//*Here I can specify,what type of node, which socket I want to instal and how many
		'sockets':{input:[],output:[s_info.types]}
		}
	}
	
	return nodes[type];
}

add_content(type) {
	this.el.node_cont = this.BD_of_nodes().create();

	this.el.cont.append(this.el.node_cont);
	this.el.name.innerHTML = type;
	this.add_sockets(type);
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
	let line_origin2 = crtEl("div",{"class":"line_origin2"});
	if (flow == "input") {
		node_line.setCSS({"top":"0"});
	}

	let line = crtEl("div",{"class":"line"});

	node_line.append(line);
	socket.append(node_line);
	socket.append(line_origin2);

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

add_sockets(type_node) {
	let type = type_node;

	//*Here I can specify,what type of node, which socket I want to instal and how many
	const sockets = this.BD_of_nodes().sockets;
	

	//INPUT PART
	for (let i=0;sockets.input.length>i;i++) {
		let new_socket = this.create_socket(sockets.input[i],'input',sockets.input[i].type);
		this.el.socket_box_top.el.append(new_socket.el);
		this.getSocketCrd(new_socket.el,new_socket.name);
		let line = new_socket.el.querySelector(".line");
				
		move_line(new_socket.el,line,{'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt});
		}
	//OUTPUT PART
	for (let i=0;sockets.output.length>i;i++) {
		let new_socket = this.create_socket(sockets.output[i],'output',sockets.output[i].type);
		this.el.socket_box_bot.el.append(new_socket.el);
		this.getSocketCrd(new_socket.el,new_socket.name);
		let line = new_socket.el.querySelector(".line");
		
		move_line(new_socket.el,line,{'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt});
	}
}
//*This is where I'm just starting communication
new_communication () {
	let el = this.el.node_cont;
		el.addEventListener("keyup",this.communication);
		el.addEventListener("change",this.communication);
		el.my_node = this;
}
//* This is where I serve communication
communication(e,isNode) {
	if (isNode == 1) {
		var my_node = this;
		var my_el = my_node.el.node_cont;
	}
	if (isNode === undefined || isNode == 0) {
		var my_node = this.my_node;
		var my_el = this;
	}
	for (let v of Object.values(my_node.sockets)) {
		if (v.connections !== undefined && v.connections != ""){
			//*START COMMUNICATION
			/*ins = "tag":"...",
					"change_value":false,
					"value":"...",
					"change_attr":true,
					"attr":"...",
					"change_var":false,
					"var":"..."
			*/
			if (v.flow == "output") {
				const oth = {
					'node':v.connections.node,
					'socket':v.connections.socket
				}

				let s_info = my_node.sockets_info();
				const my_socket = v;
				const my_type = my_socket.type
				var ins = s_info[my_type].c_instruction();

				if (my_type == oth.socket.type) {
					oth.el = oth.node.el.node_cont;
					if (ins.change_value) {
						if (my_el.type == oth.el.type) {
							oth.el[ins.value] = my_el[ins.value];
						}
					}
					if (ins.change_attr) {
						oth.el.setAttribute(ins.attr, my_el[ins.value]);
					}
				oth.node.communication(e,1);
				}
			//*END OF COMMUNICATION
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
function Fdfex_conect_sckt (e,obj,status,x,y){
	//*obj is {'arg':{'node':this,'socket':this.sockets[new_socket.name]},'f':Fdfex_conect_sckt}
	//* If the status is 1,then we are moving and searching another socket, also event is mousemove
	//* If the status is 0,then we stopped and event is mouseup
	let my_node = obj.node;
	if (status == 1) {
		cut_line = true;
		found_socket = undefined;
		// if(obj.socket.flow == "input" && obj.socket.connections !== undefined && obj.socket.connections != "") {
		//* Jesli to jest input, to nie robimy linije, pozniej trzeba to bedzie poprawic, i zmienic na to, ze jesli input komunikuje sie, to nalezy usunac mozliwosc robienia linii i podlaczania do innego socketa
		if(obj.socket.flow == "input") {
			x = 0;
			y = 0;
			return false;
		}
		for (const [key,value] of Object.entries(math_nodes)) {
			//*obj.node.name_id it is my node, it is me
			if (key != my_node.name_id) {
				for (let el of Object.keys(math_nodes[key].sockets)) {
					let oth_node = math_nodes[key];
					//*changing crds of the socket
					math_nodes[key].getSocketCrd(oth_node.sockets[el].$el,el);
					//*searching for the required socket
					if (
						oth_node.sockets[el].crds.x <= e.x &&
						oth_node.sockets[el].crds.y <= e.y &&
						oth_node.sockets[el].crds.x_bd() >= e.x &&
						oth_node.sockets[el].crds.y_bd() >= e.y
						) {
						//*end of searching
						//*enable computation
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
							found_socket = {"node":oth_node,"socket":oth_node.sockets[el]};
							// "crds":{'x':x,"y":y}
						}
						break;
						//*end of computation	
					}
					
				}
			}
		}
	}

	if (status == 0) {
	//*checking of connections and if I have some connection, than I will cut it
	if (obj.socket.flow != "input" && obj.socket.connections !== undefined && obj.socket.connections != ""){
		obj.socket.connections.socket.connections = "";
		obj.socket.connections = "";
	}
		//*jesli na kursorze nie ma potrzebnego socketa, to odcinamy linije
		if (cut_line) {
			var skt_z = obj.node.el.socket_box_top.zI;
			obj.node.el.socket_box_top.el.style.zIndex = skt_z;
			obj.node.el.socket_box_bot.el.style.zIndex = skt_z;
		}else {
			//* HERE I MAKE COMMUNICATION, of course after I turned it off
			if (found_socket !== undefined) {
				obj.socket.connections = found_socket;
				found_socket.socket.connections = {
					"node":my_node,
					"socket":obj.socket
					// "crds":{"x":obj.socket.crds.x,"y":obj.socket.crds.y}	
				}
				//* HERE I START COMMUNICATION BETWEEN NODES

				my_node.communication(e,1);
			}
			//* this cycle will fix the bug with a z index, but I'll have to finish it
			// for(let v of Object.values(my_node.sockets)) {
			// 	if (v.connections !== undefined && v.connections != "") {
			// 		console.log(v.connections)
			// 		skt_z = v.connections.node.el.socket_box_bot.zI+1;
			// 		console.log(v.connections.node.el.socket_box_bot)
			// 		v.connections.node.el.socket_box_top.el.style.zIndex = skt_z;
			// 		v.connections.node.el.socket_box_bot.el.style.zIndex = skt_z;
			// 	}
			// }
		}
		return cut_line;
	}
	
}

function keepConnection(e,r_arg,status,x,y) {
	const node = r_arg;
	for (let v of Object.values(node.sockets)) {
		node.getSocketCrd(v.$el,v.id);
		if (v.connections !== undefined && v.connections != "") {
			//* OTHER NODE PART
			var oth_socket = v.connections.socket.$el;
			var oth_origin = oth_socket.querySelector(".line_origin2");
			var oth_line = {
				"$el":oth_socket.querySelector(".line"),
				"flow":v.connections.flow
			}
			oth_line.crds = find_objCrd(oth_origin);
			//* MY NODE PART
			var my_socket = v.$el;
			var my_origin = my_socket.querySelector(".line_origin2");
			var my_line = {
				"$el":my_socket.querySelector(".line"),
				"flow":v.flow
			}
			my_line.crds = find_objCrd(my_line.$el);
			let origin_crds = find_objCrd(my_origin);

			// console.log(my_line.crds)
			if (my_line.flow == "output"){
				var crdX = oth_line.crds.x - origin_crds.x - window.pageXOffset;
				var crdY = origin_crds.y - oth_line.crds.y - window.pageXOffset;
				// console.log(crdX + " "+ crdY)

				var tgmt_arg = find_angle_tgmt (Number(crdX),Number(crdY));
				my_line.$el.style.width = tgmt_arg.r + "px";
				my_line.$el.style.transform = "rotate("+tgmt_arg.deg+"deg)";
			}else if (my_line.flow == "input") {
				var crdX =  origin_crds.x - oth_line.crds.x - window.pageXOffset;
				var crdY =  oth_line.crds.y - origin_crds.y - window.pageXOffset;
				// console.log(crdX + " "+ crdY)

				var tgmt_arg = find_angle_tgmt (Number(crdX),Number(crdY));
				oth_line.$el.style.width = tgmt_arg.r + "px";
				oth_line.$el.style.transform = "rotate("+tgmt_arg.deg+"deg)";
			}

		}
	}
}
//*TEST
function tt () {
	Object.keys(math_nodes).forEach( function(element, index) {
		console.log(math_nodes[element])
		Object.keys(math_nodes[element].sockets).forEach( function(elemen, index) {
			console.log(math_nodes[element].sockets[elemen])
		});
	});
	
}

//*ADDING NEW NODE 
function add_math_node(box_place,node_type,node_pattern,crd_obj){
	// const node = new Math_node(node_type);
	let node ="";
	if (crd_obj === undefined) {
		crd_obj= {"x":0,"y":0};
	}
	
	node = new Math_node(node_type,crd_obj.x,crd_obj.y);
	node.add(box_place,node_pattern);
	node.add_content(node_type);
	node.new_communication();

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
add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0],{"x":200,"y":60});

add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0],{"x":400,"y":100});
add_math_node(getEl('.sand_box'),"type",getEl(".node_item",1)[0]);
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

function find_objCrd (el) {
	//*crds = coordinates
	//*x_bd = x border
	if (el === undefined) {
		console.error("Uncaught ReferenceError: element is not defined");
		return false;
	}
	crds = {
		'x':getCoords(el).left,
		'y':getCoords(el).top,
		'w':el.offsetWidth,
		'h':el.offsetHeight,
		'x_bd':function(){return this.x+this.w},
		'y_bd':function(){return this.y+this.h}
	}
	return crds;
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

	const lineCrd = find_objCrd(line);
	const elCrd = find_objCrd(el);

	function m_moveD_D (e) {
		let to_move = true;
		// mouse.x = e.x - mouse.x;
		// mouse.y = e.y - mouse.y;
		let crdX = e.x - lineCrd.x - window.pageXOffset;
		let crdY = lineCrd.y - e.y - window.pageYOffset;
		var tgmt_arg = find_angle_tgmt (crdX,crdY);
		lineCrd.w = tgmt_arg.r;

//*on mouse movement I run another function
//*при движении мыши, я запускаю другую функцию
		if (fdfex !== undefined) {
			let m_move = 1;
			let move = fdfex.f(e,fdfex.arg,m_move,e.x,e.y);
			if (!move && move !== undefined) {
				to_move = false;
			}
			if (to_move) {
				line.style.width = lineCrd.w + "px";
				line.style.transform = "rotate("+tgmt_arg.deg+"deg)";
			}
		}else {
			line.style.width = lineCrd.w + "px";
			line.style.transform = "rotate("+tgmt_arg.deg+"deg)";
		}
		// mouse.x = e.x;
		// mouse.y = e.y;
	}
	

	function m_upD_D (e) {
		window.removeEventListener("mousemove",m_moveD_D);
		window.removeEventListener("mouseup",m_upD_D);
		if (fdfex !== undefined) {
			let m_up = 0;
			let cut_line = fdfex.f(e,fdfex.arg,m_up);
			if (cut_line) {
				// console.log(line)
				line.style.width = 0 + "px";
			}
		}	
	}

}