// Fungsi utama untuk ambil berita berdasarkan input pengguna
async function getNews() {
  const query = document.getElementById("newsSearch").value.trim();
  const container = document.getElementById("newsResults");

  // Jika tiada input
  if (!query) {
    container.innerHTML = `<p style="color: red; text-align:center;">Please enter a search term.</p>`;
    return;
  }

  // Paparkan loading
  container.innerHTML = `<p style="text-align:center;">Loading news articles...</p>`;

  const apiKey = "70e87a45d7b24ef594b30a358741327d"; // Gantikan dengan API key anda jika perlu
  const newsApiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&apiKey=${apiKey}&pageSize=9&sortBy=publishedAt`;

  try {
    const response = await fetch(newsApiUrl);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = `<p style="text-align:center;">No articles found for "<strong>${query}</strong>".</p>`;
      return;
    }

    // Bina HTML untuk senarai artikel
    const articlesHTML = data.articles.slice(0, 6).map(article => `
      <div class="card">
        <img src="${article.urlToImage || 'https://via.placeholder.com/150x100?text=No+Image'}" alt="Article Image" />
        <div class="card-content">
          <h3>${article.title}</h3>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more &rarr;</a>
        </div>
      </div>
    `).join("");

    container.innerHTML = articlesHTML;

  } catch (error) {
    container.innerHTML = `<p style="color: red; text-align:center;">Failed to fetch news: ${error.message}</p>`;
    console.error(error);
  }
}

// Bila butang diklik
document.getElementById("searchBtn").addEventListener("click", getNews);

// Bila tekan Enter dalam input
document.getElementById("newsSearch").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getNews();
  }
});
