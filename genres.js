document.addEventListener("DOMContentLoaded", function() {
    const genreButtons = document.querySelectorAll(".genre-button");
    const selectedMoviesContainer = document.getElementById("selected-movies");
  
    // Fetch movie data from TMDb API
    fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=45456cc15869831c16bb0353d65283c0")
      .then(response => response.json())
      .then(data => {
        // Check if the response contains movies
        if (data.results) {
          const movies = data.results;
  
          // Add event listeners to genre buttons
          genreButtons.forEach(button => {
            button.addEventListener("click", function() {
              const selectedGenre = button.getAttribute("data-genre");
              const filteredMovies = filterMoviesByGenre(movies, selectedGenre);
  
              // Display filtered movies
              displayMovies(filteredMovies, selectedMoviesContainer);
            });
          });
        } else {
          console.log("No movies found.");
        }
      })
      .catch(error => {
        console.log("An error occurred while fetching movie data:", error);
      });
  
    // Function to filter movies by genre
    function filterMoviesByGenre(movies, genre) {
      return movies.filter(movie => {
        return movie.genre_ids.includes(getGenreId(genre));
      });
    }
  
    // Function to get genre ID based on genre name
    function getGenreId(genre) {
      // Map genre names to their respective IDs
      const genreMap = {
        "action": 28,
        "comedy": 35,
        "drama": 18
        // Add more genre mappings as needed
      };
  
      return genreMap[genre];
    }
  
    // Function to display movies
    function displayMovies(movies, container) {
      // Clear the container
      container.innerHTML = "";
  
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
  
        container.appendChild(movieCard);
      });
    }
  });
  