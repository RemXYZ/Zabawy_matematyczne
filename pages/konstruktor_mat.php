<!-- <div class="content"> -->
	<div class="konstruktor_content">
		<script src=js/math_construktor.js></script>
		<div class="action_part">

			<div class="action_panel">
				<div class="text_panel">beta version</div>
				<div class="panel_icon">
					<img src="<?=$link_to_dir?>img/icons/trash.png" alt="" class="remove_but panel_icon_item">
				</div>
			</div>
			<div class="sand_box">
			<center>
			</center>
				<div class="node_pattern">

				<div class="node_item">
					<div class="node_name"></div>
					<div class="node_connection_box node_connection_box_top">
						
					</div>

					<div class="node_content">
						
					</div>

					<div class="node_connection_box node_connection_box_bot">
		
					</div>
				</div>

				</div>
							<!-- <div class="node_connection">
						<div class="node_line">
							

							<svg width="200" height="200" class="math_node_svg_line">
								<line x1="0" y1="0" x2="200" y2="190" style="stroke:rgb(196, 196, 196);stroke-width:2" />
							</svg>
						</div>
					</div> -->


			<!-- 	<div class="node_connection">
						<div class="node_line">
							</div>
					</div> -->

			

			</div>
		</div>
		<div class="node_nav">

			<ul class="node_menu">
				<div class="node_menu_desc">Add node</div>
				<li class="node-nav-item">
					<button class="node_nav_but"><img src="<?=$link_to_dir?>img/icons/input.png" alt="" class="nav_icon_item"><p>Input</p></button>
				</li>
				<li class="node-nav-item">
					<button class="node_nav_but"><img src="<?=$link_to_dir?>img/icons/type.png" alt="" class="nav_icon_item"><p>Type</p></button>
				</li>
				<li class="node-nav-item">
					<button class="node_nav_but"><img src="<?=$link_to_dir?>img/icons/math.png" alt="" class="nav_icon_item"><p>Math</p></button>
				</li>
			</ul>
		</div>
	</div>

	<script>
		const $box = getEl('.sand_box');
		const $node = getEl(".node_item",1);
		const $node_name = getEl('.node_name',1);
		const delete_but = getEl(".remove_but");
		// D_D($node_name[0],$box,$node[1]);
		// D_D($node[0],$box,700,100);

		// D_D(node[1],box,100,200);

		const node_line = getEl("#node_line_svg");

		const nav_buttons = getEl('.node_nav_but',1);
		nav_buttons[0].addEventListener("click",()=>{add_math_node($box,"input",$node[0],0,0,delete_but)});
		nav_buttons[1].addEventListener("click",()=>{add_math_node($box,"type",$node[0],0,0,delete_but)});
		nav_buttons[2].addEventListener("click",()=>{add_math_node($box,"math",$node[0],0,0,delete_but)});
		// window.onclick = function (event) {
		// 	console.log(event.target);
		// }

	</script>
<!-- </div> -->