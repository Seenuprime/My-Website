document.addEventListener("DOMContentLoaded", function() {
  const bestAnimeContainer = document.getElementById("best-anime");

  // Fetch best anime data from Kitsu API
  fetch("https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=10")
    .then(response => response.json())
    .then(data => {
      // Check if the response contains anime
      if (data.data) {
        const animeList = data.data;

        // Loop through the anime data and create anime cards
        animeList.forEach(anime => {
          const animeCard = document.createElement("div");
          animeCard.classList.add("anime-card");

          const animeImage = document.createElement("img");
          animeImage.src = anime.attributes.posterImage.medium;
          animeImage.alt = anime.attributes.titles.en_jp;
          animeCard.appendChild(animeImage);

          const animeTitle = document.createElement("h3");
          animeTitle.textContent = anime.attributes.titles.en_jp;
          animeCard.appendChild(animeTitle);

          const googleLink = document.createElement("a");
          googleLink.href = "https://www.google.com/search?q=" + encodeURIComponent(anime.attributes.titles.en_jp + " anime");
          googleLink.target = "_blank";
          googleLink.textContent = "Search on Google";
          googleLink.classList.add("google-link"); // Add a CSS class for styling
          animeCard.appendChild(googleLink);

          bestAnimeContainer.appendChild(animeCard);
        });
      } else {
        console.log("No anime found.");
      }
    })
    .catch(error => {
      console.log("An error occurred while fetching anime data:", error);
    });
});
