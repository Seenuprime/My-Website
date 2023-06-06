document.addEventListener("DOMContentLoaded", function() {
    const topRatedMoviesContainer = document.getElementById("top-rated-movies");
  
    // Fetch top-rated movie data from TMDb API
    fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=45456cc15869831c16bb0353d65283c0")
      .then(response => response.json())
      .then(data => {
        // Check if the response contains movies
        if (data.results) {
          const movies = data.results;
  
          // Loop through the movie data and create movie cards
          movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
  
            const movieImage = document.createElement("img");
            movieImage.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            movieImage.alt = movie.title;
            movieCard.appendChild(movieImage);
  
            const movieTitle = document.createElement("h3");
            movieTitle.textContent = movie.title;
            movieCard.appendChild(movieTitle);
  
            const googleLink = document.createElement("a");
            googleLink.href = "https://www.google.com/search?q=" + encodeURIComponent(movie.title + " imdb");
            googleLink.target = "_blank";
            googleLink.textContent = "Search on Google";
            googleLink.classList.add("google-link"); // Add a CSS class for styling
            movieCard.appendChild(googleLink);
  
            topRatedMoviesContainer.appendChild(movieCard);
          });
        } else {
          console.log("No movies found.");
        }
      })
      .catch(error => {
        console.log("An error occurred while fetching movie data:", error);
      });
  });
  