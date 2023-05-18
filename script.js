// Define bingo numbers
const numbers = Array.from({length: 100}, (_, i) => i + 1);
const pickedNumbers = [];
const countNumberBingo = [];
const countNumberQuine = [];
const bingoCells = document.querySelectorAll(".bingo-cell");
const pickedNumberElem = document.getElementById("picked-number");
const pickedNumbersElem = document.getElementById("picked-numbers");


// Define variables
var cells = document.querySelectorAll('.bingo-cell');
var newGameButton = document.querySelector('#new-game-btn');
var automaticGameButton = document.querySelector('#automatic-game');


var selectedNumbers = [];

// Define sorted numbers
var shuffledNumbers = shuffle(numbers.slice(0, 25));

var hasQuine = false;
var hasBingo = false;

function initialiseGame(){
    selectedNumbers = [];
	cells.forEach(function(cell) {
		cell.classList.remove('selected');
	});
	shuffle(numbers);
	updateCard();
    pickedNumbers.length = 0;
	pickedNumberElem.textContent = '';
	pickedNumbersElem.textContent = '';
	hasQuine = false;
    hasBingo = false;
	bingoCells.forEach(cell => {
		cell.classList.remove("picked");
	});
};

// Add event listeners
cells.forEach(function(cell) {
	cell.addEventListener('click', function() {
		var number = parseInt(cell.textContent);
		if (selectedNumbers.includes(number)) {
			selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
			cell.classList.remove('selected');
		} else {
			selectedNumbers.push(number);
			cell.classList.add('selected');
			checkForBingo();
			if (hasQuine == false) {
				checkForQuine();
			}
		}
	});
});

function selectCells(){
    cells.forEach((cell)=> {
        var number = parseInt(cell.textContent);
		if (selectedNumbers.includes(number)) {
			selectedNumbers.splice(selectedNumbers.indexOf(number), 1);
			cell.classList.remove('selected');
		} else {
			selectedNumbers.push(number);
			cell.classList.add('selected');
			checkForBingo();
			if (hasQuine == false) {
				checkForQuine();
			}
		}
    })
}

automaticGameButton.addEventListener('click', function(){
    initialiseGame();
    while(!hasBingo){
        console.log("has bingo ? "+ hasBingo);
        console.log(" and all picked ? " + numbers.length);
        displayPickedNumber();
        //displayPickedNumbers();
        // checkForQuine();
        // checkForBingo();
        selectCells();
    }

});

newGameButton.addEventListener('click', function(){
    initialiseGame();
});

// Shuffle function
function shuffle(array) {
	var shuffledNumbers = [];
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    shuffledNumbers = array.slice(0, 25).sort((a, b) => a - b);
    return shuffledNumbers;
}

// Update card function
function updateCard() {
	shuffledNumbers = shuffle(numbers.slice(0, 25));
    const sortedNumbers = shuffledNumbers.sort((a, b) => a - b);
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = sortedNumbers[i];
    }
}


// Pick number function
function pickNumber() {
    if (numbers.length === 0) {
        alert("All numbers have been picked!");
        return;
    }

	var randomIndex = Math.floor(Math.random() * numbers.length);
	var number = numbers[randomIndex];
	numbers.splice(randomIndex, 1);
	return number;
}

function displayPickedNumber() {
    const lastPickedNumber = pickNumber();
    pickedNumbers.push(lastPickedNumber);
    bingoCells.forEach(cell => {
      if (cell.textContent == lastPickedNumber) {
        cell.classList.add("picked");
      }
    });
    pickedNumberElem.textContent = lastPickedNumber;
}

function displayPickedNumbers() {
    pickedNumbersElem.textContent = pickedNumbers.join(', ');
}
  

const pickNumberBtn = document.getElementById("pick-number-btn");
pickNumberBtn.addEventListener("click", displayPickedNumber);
pickNumberBtn.addEventListener("click", displayPickedNumbers);


function checkForBingo() {
	var allCellsSelected = true;
	for (var i = 0; i < cells.length; i++) {
	  if (!cells[i].classList.contains('selected')) {
		allCellsSelected = false;
		break;
	  }
	}
	if (allCellsSelected) {
	  alert('Congratulations! You won!');
      hasBingo = true;
	  // Clear the selected numbers array
	  selectedNumbers = [];
      countNumberBingo.push(pickedNumbers.length);
	}
  }

  function checkForQuine() {
    var rows = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];

    // Check for completed rows
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var selectedCount = 0;
        for (var j = 0; j < row.length; j++) {
            if (selectedNumbers.includes(shuffledNumbers[row[j]])) {
                selectedCount++;
            }
        }
        if (selectedCount == 5) {
			hasQuine = true;
            alert("Quine!");
            return true;
            countNumberQuine.push(pickedNumbers.length);
        }
    }
    return false;
}
  