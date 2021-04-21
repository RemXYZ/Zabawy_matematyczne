<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		.ok {
			background-image: url('https://sib.fm/storage/article/March2021/IDsV2DD5Qhwj5kWTpfYG.jpeg') ;
			 background-size: cover;
			width: 1200px;
			height: 700px;
		}
		.block {
			position: relative;
			left:50%;
			top:50%;
			transform: translate(-50%,-50%);
			width: 500px;
			height: 500px;
			text-align: center;
		}
		.block2 {
			position: absolute;
			top: 44%;
			left: 44%;
			color: white;
			z-index: 10;
			font-weight: bold;
			font-size: 30px;
			text-shadow: 0px 0px 3px black;
		}
		.block3 {
			position: relative;
			width: 100%;
			height: 100%;
			background: #f7bc27;
			opacity: 0.7;
			filter:  blur(1px);
			box-shadow: inset 10px 10px 50px 10px #efcf7c;
			box-shadow: inset 0px 0px 200px 60px #efcf7c;

  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  border-right: 1px solid #f4e6c3;
	}
	</style>
</head>
<body>
	<div class="ok">
		<div class="block">
			<div class="block2">Hello</div>
			<div class="block3"></div>
		</div>
	</div>
</body>
</html>