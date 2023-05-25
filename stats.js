/* DOCUMENT FOR GRAPHICS OF LAWS */

/* TIRAGES */

const ctx = document.getElementById('myChartForQuine');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    datasets: [{
      label: '# of Votes',
      data: values,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
