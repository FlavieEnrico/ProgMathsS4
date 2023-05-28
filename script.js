// Define bingo numbers
const numbers = Array.from({length: 100}, (_, i) => i + 1);
const pickedNumbers = [];
var orderedNumbers = Array.from({length: 100}, (_, i) => i + 1);

const bingoCells = document.querySelectorAll(".bingo-cell");
const pickedNumberElem = document.getElementById("picked-number");
const pickedNumbersElem = document.getElementById("picked-numbers");
const stopButtonElem = document.getElementById("stop-btn");
const nbForQuineElem = document.getElementById("count-quine");
const nbForBingoElem = document.getElementById("count-bingo");
const gridModeElem = document.getElementById("grid-mode");
const pickModeElem = document.getElementById("pick-mode");

// Define variables
var cells = document.querySelectorAll('.bingo-cell');
var newGameButton = document.querySelector('#new-game-btn');
var automaticGameButton = document.querySelector('#automatic-game');

//Statistics 
let binomialResults = Array(100).fill(0);
let LaplaceResuts = Array(100).fill(0);
let normalResults = [];
let exponentialResults = [];
let poissonResults = Array(100).fill(0);
let negBinomialResults = Array(100).fill(0);
let geometricResults = Array(100).fill(0);


var selectedNumbers = [];
var playing;
var nbForBingo = [];
var nbForQuine = [];
var count = 0;

// Define sorted numbers
var shuffledNumbers = shuffle(numbers.slice(0, 25));

var hasQuine = false;
var hasBingo = false;
var stop = false;

function initialiseGame() {
    selectedNumbers = [];
    cells.forEach(function (cell) {
        cell.classList.remove('selected');
    });
    numbers.splice(0, numbers.length, ...shuffle(Array.from({ length: 100 }, (_, i) => i + 1)));
    if (gridModeElem.value === "") {
        updateClassicCard();
    } else if (gridModeElem.value === "laplace") {
        updateLaplaceCard();
    } else if (gridModeElem.value === "poisson") {
        updatePoissonCard();
    }
    pickedNumbers.length = 0;
    pickedNumberElem.textContent = "";
    pickedNumbersElem.textContent = "";
    hasQuine = false;
    hasBingo = false;
    stop = false;
    bingoCells.forEach(cell => {
        cell.classList.remove("picked");
    });
}



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

newGameButton.addEventListener('click', function () {
    if (!stop) {
        stop = true; // Stop the game loop
        setTimeout(function () {
            initialiseGame();
            playing();
            stop = false;
        }, 0);
    } else {
        initialiseGame();
        playing();
        stop = false;
    }
});


function playing(){

    // let pickingTime = Laplace(5000, 1000);
    let pickingTime = exponentielle(0.002);
    exponentialResults.push(pickingTime);
    pickingTime = Math.max(2000, Math.min(8000, pickingTime));

  
    //     console.log(Math.abs(Laplace(1000,4)));

    if (hasBingo || stop || numbers.length === 0) {
        // Game over or stop button clicked
        displayPickedNumbers();
        displayGridGraph();
        displayPickTimeGraph();
        displayPickingGraph();
        displayStayingGraph();
    } else {
        setTimeout(function () {
            displayPickedNumber();
            playing();
        }, pickingTime);
    }

}

stopButtonElem.addEventListener('click', function(){stop = true});





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

function sortNumbers(shuffledNumbers){
    const sortedNumbers = shuffledNumbers.sort((a, b) => a - b);
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = sortedNumbers[i];
    }
}

// Update card function
function updateClassicCard() {
    shuffledNumbers = shuffle(numbers.slice(0, 25));
    sortNumbers(shuffledNumbers);
}

function updatePoissonCard() {
    let gridNumbers = [];
	while(gridNumbers.length < 25){
        let number = Poisson(50);
        poissonResults[number-1]++;
        if(!gridNumbers.includes(number) && numbers.includes(number)){
            gridNumbers.push(number);
        }
    }
    sortNumbers(gridNumbers);
    
}


function updateLaplaceCard() {


    let gridNumbers = [];
    let gridPackage = orderedNumbers;
	while(gridNumbers.length < 25){
        let randomIndex = Math.floor(Laplace(5,12));
        if(randomIndex <= 100){
            LaplaceResuts[randomIndex-1]++;
        }

        if(randomIndex < gridPackage.length){
            
            let number = gridPackage[randomIndex];
        
            gridPackage.splice(randomIndex, 1);
            gridNumbers.push(number)
         
        }

    
    }

    sortNumbers(gridNumbers)
	
}






// Pick number function
function pickNumber() {
    if (numbers.length === 0) {
        alert("All numbers have been picked!");
        return;
    }

	let randomIndex = Math.floor(Math.random() * numbers.length);
	let number = numbers[randomIndex];
	numbers.splice(randomIndex, 1);
	return number;
}

function binomialPickNumber(){
    if (numbers.length === 0) {
        alert("All numbers have been picked!");
        return;
    }

    
    let randomIndex = Math.floor(binomiale(100,0.5));
    binomialResults[randomIndex-1]++;
	let number = orderedNumbers[randomIndex];
	orderedNumbers.splice(randomIndex, 1);
	return number;
}

function negBinomialPickNumber(){
    if (numbers.length === 0) {
        alert("All numbers have been picked!");
        return;
    }

    
    let randomIndex = Math.floor(negativeBinomiale(50, 0.5));
    negBinomialResults[randomIndex-1]++;
	let number = orderedNumbers[randomIndex];
	orderedNumbers.splice(randomIndex, 1);
	return number;
}

function GeometricPickNumber(){
    if (numbers.length === 0) {
        alert("All numbers have been picked!");
        return;
    }

    
    let randomIndex = Math.floor(geometric(0.2));
    geometricResults[randomIndex-1]++;
	let number = orderedNumbers[randomIndex];
	orderedNumbers.splice(randomIndex, 1);
	return number;
}

function displayPickedNumber() {
    let lastPickedNumber = 0;

    if(pickModeElem.value == "binomial"){
      lastPickedNumber = binomialPickNumber();
    }
    else if(pickModeElem.value == "inv-binomial"){
        lastPickedNumber = negBinomialPickNumber();
    }
    else if(pickModeElem.value == "geometric"){
        lastPickedNumber = GeometricPickNumber();
    }
    else{
        lastPickedNumber = pickNumber();
    }
    count++;
    console.log(count)

    pickedNumbers.push(lastPickedNumber);
    bingoCells.forEach(cell => {
      if (cell.textContent == lastPickedNumber) {
        cell.classList.add("picked");
      }
    });

    let time = normalDistribution(1000, 500);
    normalResults.push(time);
    //console.log(time);
    pickedNumberElem.textContent = lastPickedNumber;
    setTimeout(function(){
        pickedNumberElem.textContent = '';
    }, time);
    
}

function displayPickedNumbers() {
    pickedNumbersElem.textContent = pickedNumbers.join(', ');
}
  


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
      nbForBingo.push(pickedNumbers.length);
      localStorage.setItem("statBingo", nbForBingo);
      nbForBingoElem.textContent = pickedNumbers.length;
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
            nbForQuineElem.textContent = pickedNumbers.length;
            nbForQuine.push(pickedNumbers.length);
            localStorage.setItem("QuineStat", nbForQuine);
            return true;
        }
    }
    return false;
}
  