const API_KEY = "4413dbd78ad72df87c86110a6358db1d"; // Gantikan dengan API key sebenar
const url = `https://api.openweathermap.org/data/2.5/weather?q=Kuala+Lumpur&units=metric&appid=${API_KEY}`;

let tempChart;

function updateChart(temp) {
  const timeNow = new Date().toLocaleTimeString();

  if (!tempChart) {
    const ctx = document.getElementById('tempChart').getContext('2d');
    tempChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [timeNow],
        datasets: [{
          label: 'Temperature (°C)',
          data: [temp],
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255,99,132,0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  } else {
    tempChart.data.labels.push(timeNow);
    tempChart.data.datasets[0].data.push(temp);
    if (tempChart.data.labels.length > 10) {
      tempChart.data.labels.shift();
      tempChart.data.datasets[0].data.shift();
    }
    tempChart.update();
  }
}

// Fetch data & update chart every 10 seconds
function fetchWeather() {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;

      document.getElementById("temperature").textContent = `${temp}°C`;
      document.getElementById("condition").textContent = condition;

      updateChart(temp);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

fetchWeather(); // Initial fetch
setInterval(fetchWeather, 10000); // Refresh every 10 seconds
