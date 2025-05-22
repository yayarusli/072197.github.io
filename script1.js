<script>
  const API_KEY = "4413dbd78ad72df87c86110a6358db1d";
  let tempChart;
  let currentCity = "Kuala Lumpur";

  function buildURL(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  }

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
            borderColor: '#800020',
            backgroundColor: 'rgba(128, 0, 32, 0.1)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: false }
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

  function fetchWeather(city) {
    fetch(buildURL(city))
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => {
        const temp = data.main.temp;
        const condition = data.weather[0].description;

        document.getElementById("temperature").textContent = `${temp}°C`;
        document.getElementById("condition").textContent = condition;
        document.querySelector("h2").textContent = `🌦️ Weather in ${data.name}`;

        updateChart(temp);
      })
      .catch(error => {
        alert("⚠️ Error: " + error.message);
      });
  }

  function changeCity() {
    const input = document.getElementById("cityInput").value.trim();
    if (input) {
      currentCity = input; // Update current city!
      if (tempChart) {
        tempChart.destroy();
        tempChart = null;
      }
      fetchWeather(currentCity);
    }
  }

  // Initial fetch
  fetchWeather(currentCity);

  // Auto update every 10 seconds for the selected city
  setInterval(() => {
    fetchWeather(currentCity);
  }, 10000);
</script>
