<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
main::before {
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/80625/tree.jpg) 0 / cover fixed;
}

main {
  margin: 100px auto;
  position: relative;
  padding: 10px 5px;
  background: hsla(0, 0%, 100%, .3);

  font-size: 20px;
  font-family: 'Lora', serif;
  line-height: 1.5;
  border-radius: 10px;
  width: 60%;
  box-shadow: 5px 3px 30px black;
  overflow: hidden;
}

main::before {
  content: '';
  margin: -35px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(20px);
  z-index: -1;
}

    .ok {
      background-image: url('https://sib.fm/storage/article/March2021/IDsV2DD5Qhwj5kWTpfYG.jpeg') ;
       background-size: cover;
      width: 1200px;
      height: 700px;
    }
    .block::before {
      background-image: url('https://sib.fm/storage/article/March2021/IDsV2DD5Qhwj5kWTpfYG.jpeg');
      background-size: cover;
    }
    .block {
      position: relative;
      left:50%;
      top:50%;
      transform: translate(-50%,-50%);
      width: 500px;
      height: 500px;

      background: hsla(0, 0%, 100%, .3);
      overflow: hidden;
      text-align: center;
    }

.block::before {
  content: '';
  margin: -35px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  filter: blur(20px);
  z-index: -1;
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

  </style>
</head>
<body>

<br><br>
 <style>
.blurred {
    position: relative;
    z-index: 0;
    filter: blur(4px);
}

.popup {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    border: 1px solid #000;
}

.popup__box {
    margin-top: 20px;
    background-color: rgba(255, 0, 0, .1);
 }
</style>
<img width="200"src="https://sib.fm/storage/article/March2021/IDsV2DD5Qhwj5kWTpfYG.jpeg" alt="sample"/>
<div class="blurred">
  <div>Maybe a navbar goes here</div>
  <h3>Hi, I'm blurred</h3>
  
  <div>Maybe a footer goes here</div>
</div>

<div class="popup">
  <div class="popup__box">
    Hi, I'm a popup
  </div>
</div>


  <main>
  <blockquote>"The more often we see the things around us &#45; even the beautiful and wonderful things &#45; the more they become invisible to us. That is why we often take for granted the beauty of this world: the flowers, the trees, the birds, the clouds &#45;
    even those we love. Because we see things so often, we see them less and less."
    <footer>&mdash;
      <cite>
        Joseph B. Wirthlin
      </cite>
    </footer>
  </blockquote>
</main>

  <div class="ok">
    <div class="block">
      <div class="block2">Hello</div>
     <!--  <div class="block3"></div> -->
    </div>
  </div>
zrudlo <a href="https://stackoverflow.com/questions/38145368/css-workaround-to-backdrop-filter">blur</a>



</body>
</html>