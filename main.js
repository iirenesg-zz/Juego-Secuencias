var start = document.getElementById('start');
var gameBlocks = document.getElementsByClassName('gameBlock');
var levelBox = document.getElementById('levelBox');
var livesBox = document.getElementById('livesBox');
var alert = document.getElementById('alert');
var hearts;
var lives;
var sequence;
var level;
var position; //Position in the sequence

start.addEventListener('click', startGame, false);

//Changing color states
function greenBlock(a) {
	var block=a;
	block.setAttribute('style', 'background-color: green');
	window.setTimeout(function(){
		block.setAttribute('style', 'background-color: black');
	}, 500)
}

function redBlock(a) {
	var block=a;
	block.setAttribute('style', 'background-color: red');
	window.setTimeout(function(){
		block.setAttribute('style', 'background-color: black');
	}, 500)
}

function startGame() {
	level = 1;
	lives = 3;

	for (i=0; i<lives; i++) {
		var span = document.createElement('span');
		span.appendChild(document.createTextNode('❤'));
		span.setAttribute('class', 'hearts');
		livesBox.appendChild(span);
	}

	hearts = document.getElementsByClassName('hearts');
	sequence = [];
	addToSequence();
	addToSequence();

	//Adds event to blocks
	for (i=0; i<gameBlocks.length; i++) {
		var el = gameBlocks[i];
		el.addEventListener('click', validateLevel, false);
	};

	startLevel();
}

function addToSequence() {
	min = Math.ceil(0);
	max = Math.floor(4);
  	var n = Math.floor(Math.random() * (max - min)) + min;
	sequence.push(n);
}

function startLevel() {
	var levelTxt = 'Nivel ' + level;
	alert.textContent = levelTxt;
	alert.style.visibility = 'initial';
	setTimeout(function() {
		alert.style.visibility = 'hidden';
		levelBox.textContent = levelTxt;
		position = 0;
		var time = 0;
		timeout();
	}, 1500)
	
	function timeout() {
	    setTimeout(function () {
	    	var block=gameBlocks[sequence[position]];
	        greenBlock(block);
	        if (position != sequence.length-1) {
	        	position++;
	        	timeout();
	        } else {
	        	position = 0;
	        }
	    }, 1000);
	}
}

function validateLevel() {
	if(this.id == sequence[position]) {
		greenBlock(this);
		setTimeout(position++, 500);
		if (position == sequence.length) {
			setTimeout(function() {
				level++;
				addToSequence();
				startLevel();
			}, 1000);
		}
	} else {
		redBlock(this);
		if (lives != 0) {
			livesBox.removeChild(hearts[lives-1]);
			lives--;
			setTimeout(startLevel, 1000);
		} else {
			setTimeout(function() {
				alert.textContent = 'Game Over';
				alert.style.visibility = 'initial';
				alert.style.left = '15%';
			}, 1000);
		}
	}	
}