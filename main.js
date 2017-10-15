 var tileImages = [];
    var tileArray = [];
    var tileFlippedOver=[];
    var cardFlipped = -1;
    var timer='';
    var playLockout=false;
    var startButton = document.getElementById('start');
    var gameBoard = document.getElementById('gameboard');
    var message=document.getElementById('message');
    var gamePlay = false;

    //event listens
    startButton.addEventListener('click', startGame);
    function gameover(){
    	startButton.style.display='block';
    	message.innerHTML="click to start new game";
    	gamePlay=false;
    	tileImages=[];
    	tileFlippedOver=[];
    }

    //Functions
    function startGame() {
    	playLockout=false;
      startButton.style.display = 'none';
      if (!gamePlay) {
        gamePlay = true;
        buildArray();
        tileArray = tileImages.concat(tileImages);
        shuffleArray(tileArray);
        buildBoard();
        message.innerHTML="Click any tile";  
         }

    }

    function buildBoard() {
      var html = "";
      for (var x = 0; x <= (tileArray.length - 1); x++) {
        html += '<div class="gameTile"><div class="gameTile">';
        html += '<img id="cardz' + x + '" src="images/back.jpg" onclick="pickCard(' + x + ',this)" class="flipImage"></div></div>';
      }
      gameBoard.innerHTML = html;
    }
    function isinArray(v,array){
    	return array.indexOf(v) >-1;
    }
    function cardFlip(t,ti){
    	t.src = "images/" + tileArray[ti];
         tileFlippedOver.push(t.id);
         console.log(tileFlippedOver);
    }
    function hideCard(){
    	for(var x=0;x<2;x++){
    		var vid=tileFlippedOver.pop();
    		document.getElementById(vid).src="images/back.jpg"
    		 
    	}
    	clearInterval(timer);
    	playLockout=false;
    	 cardFlipped = -1;
    	 message.innerHTML="Click any tile";
    }
    function checksrc(v){
    	var v =document.getElementById(v).src;
    	return v;
    }

    function pickCard(tileIndex, t) {
       //check if its already flipped
      if(!isinArray(t.id,tileFlippedOver) && !playLockout){
      	//console.log('not in array');
      message.innerHTML="check for match";
      if (cardFlipped >= 0) {
          cardFlip(t,tileIndex);
          var secondCard = tileIndex;
          playLockout=true;
          if(checksrc(tileFlippedOver[tileFlippedOver.length-1])==checksrc(tileFlippedOver[tileFlippedOver.length-2])){

            //match
            //console.log('match');
            message.innerHTML="Match found";
            playLockout=false;
            cardFlipped = -1;
            //chek if game is over
            if(tileFlippedOver.length==tileArray.length){
            	gameover();
            }

        }else{
        	//no match
        	//console.log(' no match');
        	message.innerHTML=" No Match ";
        	timer=setInterval(hideCard,100);
        }
      } else {
        
        cardFlipped = tileIndex;
         cardFlip(t,tileIndex);
      }


      }else{
      	 message.innerHTML="Already Click";
    }
}

    function buildArray() {
      for (var x = 1; x < 7; x++) {
        tileImages.push(x + '.jpg');
      }
    }

    function shuffleArray(array) {
      for (var x = array.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var itemValue = array[x];
        array[x] = array[holder];
        array[holder] = itemValue;
      }
      return array;
    }