/* DOCUMENT FOR GRAPHICS OF LAWS */

const labelTab = [];
for(let i=1; i<= 100; i++){
  const char = i.toString();
  labelTab.push(char);
}

const ctx1 = document.getElementById('gridChart');
const ctx2 = document.getElementById('pickChart');
const ctx3 = document.getElementById('timeBetweenChart');
const ctx4 = document.getElementById('stayTimeChart');
let gridChart;
let pickChart;
let timeBetweenChart;
let stayTimeChart;


/* TIRAGES */



function displayGridGraph(){

  let values = [];

  if(gridModeElem.value == "laplace"){
    values = LaplaceResuts;
    console.log(values)
  }
  else if(gridModeElem.value == "poisson"){
    console.log("je passe ici")
    values = poissonResults;
    
  }

gridChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: labelTab ,
    datasets: [{
      label: '# of picking',
      data: values,
      borderWidth: 1
    }]
  },
  options: {
    plugins:{
      title: {
        display: true,
        text: 'Répartition des probabilités de la grille'
      }

    },
    scales: {
      y: {
        beginAtZero: true
      },
    }
  }
});

}

newGameButton.addEventListener('click', ()=>{
  if(gridChart){
    gridChart.destroy();
    gridChart = null;
  }
  if(pickChart){
    pickChart.destroy();
    pickChart = null;
  }
  if(timeBetweenChart){
    timeBetweenChart.destroy();
    timeBetweenChart = null;
  }
  if(stayTimeChart){
    stayTimeChart.destroy();
    stayTimeChart = null;
  }
});



function displayPickingGraph(){

  let values = [];

  if(pickModeElem.value == "binomial"){
    values = binomialResults;
    console.log("binomial value :" + values)
  }
  else if(pickModeElem.value == "inv-binomial"){
    values = negBinomialResults;
    
  }
  else if(pickModeElem.value == "geometric"){
    values = geometricResults;
  }

pickChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: labelTab ,
    datasets: [{
      label: '# of picking',
      data: values,
      borderWidth: 1
    }]
  },
  options: {
    plugins:{
      title: {
        display: true,
        text: 'Répartition des probabilités des numéros tirés'
      }

    },
    scales: {
      y: {
        beginAtZero: true
      },
    }
  }
});

}

function displayPickTimeGraph(){


  let statTab = Array(8).fill(0);
  for(let i=0; i< exponentialResults.length; i++){
    if(exponentialResults[i] <= 2000){
      statTab[0]++;
    }
    else if(exponentialResults[i] > 2000 && exponentialResults[i] <= 4000){
      statTab[1]++;
    }
    else if(exponentialResults[i] > 4000 && exponentialResults[i] <= 6000){
      statTab[2]++;
    }
    else if(exponentialResults[i] > 6000 && exponentialResults[i] <= 8000){
      statTab[3]++;
    }
    else if(exponentialResults[i] > 8000 && exponentialResults[i] <= 10000){
      statTab[4]++;
    }
    else if(exponentialResults[i] > 1000 && exponentialResults[i] <= 12000){
      statTab[5]++;
    }
    else if(exponentialResults[i] > 12000 && exponentialResults[i] <= 14000){
      statTab[6]++;
    }
    else{
      statTab[7]++;
    }
  }

timeBetweenChart = new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['0-2000', '2000-4000', '4000-6000', '6000-8000', '8000-10000', '10000-12000', '12000-14000', '>14000'] ,
    datasets: [{
      label: '# of picking',
      data: statTab,
      borderWidth: 1
    }]
  },
  options: {
    plugins:{
      title: {
        display: true,
        text: 'Répartition des temps entre chaque numéro tiré'
      }

    },
    scales: {
      y: {
        beginAtZero: true
      },
    }
  }
});

}

function displayStayingGraph(){

  let statTab = Array(9).fill(0);
  console.log(normalResults)
  for(let i=0; i< normalResults[i];i++){
    if(normalResults[i] <= 970){
      statTab[0]++;
    }
    else if(normalResults[i] > 970 && normalResults[i] <= 980){
      statTab[1]++;
    }
    else if(normalResults[i] > 980 && normalResults[i] <= 990){
      statTab[2]++;
    }
    else if(normalResults[i] > 990 && normalResults[i] <= 1000){
      statTab[3]++;
    }
    else if(normalResults[i] > 1000 && normalResults[i] <= 1010){
      statTab[4]++;
    }
    else if(normalResults[i] > 1010 && normalResults[i] <= 1020){
      statTab[5]++;
    }
    else if(normalResults[i] > 1020 && normalResults[i] <= 1030){
      statTab[6]++;
    }
    else if(normalResults[i] > 1030 && normalResults[i] <= 1040){
      statTab[7]++;
    }
    else{
      statTab[8]++;
    }
  }


stayTimeChart = new Chart(ctx4, {
  type: 'bar',
  data: {
    labels: ['0-970', '970-980', '980-990', '990-1000', '1000-1010', '1010-1020', '1020-1030', '1030-1040' , '>1040'] ,
    datasets: [{
      label: '# of picking',
      data: statTab,
      borderWidth: 1
    }]
  },
  options: {
    plugins:{
      title: {
        display: true,
        text: "Répartition des temps d'affichage des numéros tirés"
      }

    },
    scales: {
      y: {
        beginAtZero: true
      },
    }
  }
});

}

newGameButton.addEventListener('click', ()=>{
  if(gridChart){
    gridChart.destroy();
    gridChart = null;
  }
});

newGameButton.addEventListener('click', ()=>{
  if(gridChart){
    gridChart.destroy();
    gridChart = null;
  }
});

newGameButton.addEventListener('click', ()=>{
  if(gridChart){
    gridChart.destroy();
    gridChart = null;
  }
});