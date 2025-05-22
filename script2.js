function searchNews() {
  const keyword = document.getElementById("newsKeyword").value.trim();
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  if (!keyword) {
    alert("Please enter a keyword.");
    return;
  }

  fetch(`proxy.php?q=${encodeURIComponent(keyword)}`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch news");
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
            ${article.urlToImage ? `<img src="${article.urlToImage}" class="card-img-top news-img" alt="News Image" />` : ""}
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description || "No description available."}</p>
              <a href="${article.url}" class="btn btn-sm btn-outline-primary" target="_blank" rel="noopener noreferrer">Read more</a>
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
