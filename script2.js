const API_KEY = 'fe17749c3e942e70e9ace6165e10de19';
const BASE_URL = 'https://gnews.io/api/v4/search';

function searchNews() {
  const keyword = document.getElementById("newsKeyword").value.trim();
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  if (!keyword) {
    alert("Please enter a keyword.");
    return;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&max=10&lang=en&token=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("News not found.");
      return response.json();
    })
    .then(data => {
      if (!data.articles || data.articles.length === 0) {
        container.innerHTML = "<p class='text-center'>No news found.</p>";
        return;
      }

      data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "col-md-6";

        card.innerHTML = `
          <div class="card">
            ${article.image ? `<img src="${article.image}" class="card-img-top news-img" alt="News Image">` : ""}
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || "No description available."}</p>
              <a href="${article.url}" class="btn btn-sm btn-outline-primary" target="_blank">Read more</a>
            </div>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p class="text-center text-danger">Error: ${error.message}</p>`;
    });
}
