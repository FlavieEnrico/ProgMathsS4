// Define bingo numbers
const numbers = Array.from({length: 100}, (_, i) => i + 1);
const pickedNumbers = [];
const bingoCells = document.querySelectorAll(".bingo-cell");
const pickedNumberElem = document.getElementById("picked-number");
const pickedNumbersElem = document.getElementById("picked-numbers");

// Define variables
var cells = document.querySelectorAll('.bingo-cell');
var newGameButton = document.querySelector('#new-game-btn');

var selectedNumbers = [];

// Define sorted numbers
const sortedNumbers = numbers.slice(0, 25).sort((a, b) => a - b);

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
		}
	});
});


newGameButton.addEventListener('click', function() {
	selectedNumbers = [];
	cells.forEach(function(cell) {
		cell.classList.remove('selected');
	});
	shuffle(numbers);
	updateCard();
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
    const shuffledNumbers = shuffle(numbers.slice(0, 25));
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

newGameButton.addEventListener('click', function() {
	selectedNumbers = [];
	cells.forEach(function(cell) {
		cell.classList.remove('selected');
	});
	shuffle(numbers);
	updateCard();
	pickedNumbers.length = 0;
	pickedNumberElem.textContent = '';
	pickedNumbersElem.textContent = '';
	bingoCells.forEach(cell => {
		cell.classList.remove("picked");
	});
});

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
	  // Clear the selected numbers array
	  selectedNumbers = [];
	}
  }
  