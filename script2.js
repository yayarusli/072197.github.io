const API_KEY = '4a33b21f36a64a8bb5ed37940042ed55'; 
const BASE_URL = 'https://newsapi.org/v2/everything';

function searchNews() {
  const keyword = document.getElementById("newsKeyword").value.trim();
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  if (!keyword) {
    alert("Please enter a keyword.");
    return;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("News not found.");
      return response.json();
    })
    .then(data => {
      if (data.articles.length === 0) {
        container.innerHTML = "<p class='text-center'>No news found.</p>";
        return;
      }

      data.articles.forEach(article => {
        const card = document.createElement("div");
        card.className = "col-md-6";

        card.innerHTML = `
          <div class="card">
            ${article.urlToImage ? `<img src="${article.urlToImage}" class="card-img-top news-img" alt="News Image">` : ""}
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
