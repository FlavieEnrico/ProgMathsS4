/* DOCUMENT FOR GRAPHICS OF LAWS */

const labelTab = [];
for(let i=1; i<= 100; i++){
  const char = i.toString();
  labelTab.push(char);
}

const ctx = document.getElementById('gridChart');
let gridChart;


/* TIRAGES */



function displayGridGraph(){

  let values = [];

  if(gridModeElem.value == "exponential"){
    values = exponentialResults;
  }
  else if(gridModeElem.value == "poisson"){
    console.log("je passe ici")
    values = poissonResults;
    console.log(values)
  }

gridChart = new Chart(ctx, {
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
});