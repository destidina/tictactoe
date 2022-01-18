document.addEventListener('DOMContentLoaded', function() {

var optionsButton = document.getElementById("options_submit");
const header = document.querySelector("#headerText")

optionsButton.addEventListener("click", function(){

optionsButton.innerHTML = "Restart";
header.innerText = "Play!"
header.style.color = "black";

function isEven(value){
    if (value % 2 == 0) {
       	return true;
    } else {
        return false;
	};
};

function isOdd(value){
	if (value % 1 == 0) {
		return true;
	} else {
		return false;
	};
};

function allSame(array) { 
    var first = array[0];

    if (array[0] == "") {
    	return false;
    } else {
    	return array.every(function(element) {
        	return element == first;
    	});
    };
};

var customBackground = '#4c98af'

var boardSize = parseInt(document.getElementById("boardsize_input").value);
var clicked = document.getElementById("boardsize_input");
clicked.addEventListener("input", function(){
	optionsButton.innerHTML = "Play";
})

var gameBoard = [];

var numSquares = (boardSize * boardSize);

for (var i = 0; i < numSquares; i++) {
	gameBoard.push(i);
};

document.getElementById("game").innerHTML = '<div id="board"></div>';


var board = document.getElementById("board");

board.style.margin = '0 auto';

board.style.height = (100 * boardSize) + 'px';
board.style.width = (100 * boardSize) + 'px';

board.style.border = 'solid 1px black';

for (var i = 0; i < numSquares; i++) {
	board.innerHTML += '<div class="square"></div>'; 
};

var squares = document.getElementsByClassName("square");

for (var i = 0; i < numSquares; i++) {
	squares[i].style.height = '100px';
	squares[i].style.width = '100px';
	squares[i].style.float = "left";
	squares[i].style.lineHeight = "100px";
	squares[i].setAttribute("id", i.toString());
};

if (numSquares % 2 !== 0) { 
	for (var i = 0; i < numSquares; i += 2) {
		squares[i].style.backgroundColor = customBackground;
	};
} else { 
	for (i = 0; i < numSquares; i += 1) {
		if (isEven(i/boardSize)) { 
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else if (isOdd(i/boardSize)) { 
			for (var squareNum = i+1; squareNum < (i + boardSize); squareNum += 2) {
				squares[squareNum].style.backgroundColor = customBackground;	
			};
		} else {
		};
	};
};

var turnIndicator = document.getElementById("turnIndicator")

turnIndicator.style.color = "black";
turnIndicator.innerHTML = "Tap anywhere to start. It's X's turn!";

var boardClicks = 0;

board.addEventListener("click", function() {
if (determineWinner()) { 
	turnIndicator.style.color = "black";
	header.style.color = "#4c98af";
	header.style.color = "#4c98af";
	turnIndicator.innerHTML = "Congrats!";
	header.innerText = `${winningPlayer[0]} HAS WON!`;
	
} else if (isEven(boardClicks)) {
	turnIndicator.style.color = "black";
	turnIndicator.innerHTML = "It's O's turn!";
} else {
	turnIndicator.style.color = "white";
	turnIndicator.innerHTML = "It's X's turn!";
};
boardClicks++;
}); 

var squareClicks = [];

for (var i = 0; i < numSquares; i++) {
	squareClicks[i] = 0;
};

var winningPlayer;

var determineWinner = function() {
	for (i = 0; i < numSquares; i += 1) { 
		if ((i % boardSize) == 0) {
			var rowCheck = [];
			for (var squareNum = i; squareNum < (i + boardSize); squareNum += 1) { 
				rowCheck.push(squares[squareNum].innerHTML);
			};

			if (allSame(rowCheck)) {
				winningPlayer = rowCheck; 
				return true;
			};
		};
	};
	for (i = 0; i < numSquares; i += 1) { 
		if (i < boardSize) { 
			var colCheck = [];
			for (var squareNum = i; squareNum < numSquares; squareNum += boardSize) {	
				colCheck.push(squares[squareNum].innerHTML);
			};
			
			if (allSame(colCheck)) {
				winningPlayer = colCheck; 
				return true;
			};	
		};
	};
	var diag1Check = []; 
	for (i = 0; i < numSquares; i += 1) {
		if ((i % (boardSize + 1)) == 0) { 
			console.log(i)
			diag1Check.push(squares[i].innerHTML);
		};
	};
	
	if (allSame(diag1Check)) { 
		winningPlayer = diag1Check; 
		return true;
	};
	var diag2Check = []; 
	for (i = (boardSize - 1); i < (numSquares - 1); i += 1) { 
		if ((i % (boardSize - 1)) == 0) {
			console.log(i)
			diag2Check.push(squares[i].innerHTML);
		};
	};
	
	if (allSame(diag2Check)) { 
		winningPlayer = diag2Check; 
		return true;
	};
}; 

var countClicks = function() {
	var divID = this.getAttribute("id");
	squareClicks[divID] += 1;
	if (isEven(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'X';
	} else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
		this.innerHTML = 'O';
		this.style.color = "white";
	} else if (!determineWinner()){
		alert('Oops. That space is taken. Try another!');
		boardClicks -= 1;
	} else {
	};
	if (determineWinner()) { 
		for (var i = 0; i < numSquares; i++) {
			squareClicks[i] = 2;
		};
		document.getElementById("options_submit").innerHTML = "Play again?"
	};
};

for (var i = 0; i < numSquares; i++) {
	squares[i].addEventListener("click", countClicks);
};
}); 
});