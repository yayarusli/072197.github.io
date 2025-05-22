const covidCtx = document.getElementById('covidChart').getContext('2d');
const dengueCtx = document.getElementById('dengueChart').getContext('2d');

// COVID-19 from API
fetch("https://disease.sh/v3/covid-19/countries/malaysia")
  .then(res => res.json())
  .then(data => {
    new Chart(covidCtx, {
      type: 'bar',
      data: {
        labels: ['Cases', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'COVID-19 Stats',
          data: [data.cases, data.recovered, data.deaths],
          backgroundColor: ['#f39c12', '#27ae60', '#c0392b']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  });

// Static Dengue data (replace with real API if available)
const dengueData = {
  labels: ['January', 'February', 'March'],
  datasets: [{
    label: 'Dengue Cases',
    data: [1200, 950, 1300],
    backgroundColor: '#3498db'
  }]
};

new Chart(dengueCtx, {
  type: 'line',
  data: dengueData,
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
