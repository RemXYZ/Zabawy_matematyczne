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
					
	let line_svg = crtEl("svg",{"height":"0",
		"width":"0",
		"class":"math_node_svg_line"
	});
	let line_info = {
		'x1':"0",'y1':"0",
		'x2':"0",'y2':"0",
		'style':'stroke:rgb(196, 196, 196); stroke-width:2'
	}
	let line = crtEl("line",line_info);

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
	console.log(this.sockets[name].crds);
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
			}
			//OUTPUT PART
			for (let i=0;sockets[key].output.length>i;i++) {
				let new_socket = this.create_socket(sockets[key].input[i],'output',type);
				this.el.socket_box_bot.append(new_socket.el);
			}
		}
	}

}


}
//END OF CLASS MATH_NODE;

function move_line (element,trigger_node) {

	const el = element;

}


let node ="";

function add_math_node(box_place,node_type,node_pattern){
	node = new Math_node(node_type);
	node.add(box_place,node_pattern);
	node.add_content(node_type);

	//WRITING INFORMATION ABOUT THIS NODE IN the object: math_nodes
	//ZAPISUJE INFORMACJE O TYM NODZIE W objekcie: math_nodes
	//ЗАПИСЫВАЮ ИНФОРМАЦИЮ ОБ ЭТОМ НОДЕ В объекте: math_nodes
	let node_id = "node_"+node.id;
	node.$el.setAttribute("id",node_id);
	math_nodes[node_id] = node;

}
window.onload = ()=> {
add_math_node(getEl('.sand_box'),"input",getEl(".node_item",1)[0])
}

window.onclick = (event)=> {
	console.log(event.target);
}


