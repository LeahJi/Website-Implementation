function confirmSelection() {
    const selectedGenres = [];
    document.querySelectorAll('#genres input[type="checkbox"]:checked').forEach(checkbox => {
        selectedGenres.push(checkbox.value);
    });
    localStorage.setItem('selectedGenres', JSON.stringify(selectedGenres));

    // Close overlay and un-darken page
    document.getElementById('overlay').style.display = 'none';
    
    // Prepare and send API call
    const genresParam = selectedGenres.join(',');
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genresParam}`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzUwZDJiN2ZiYTA3ODAxNzE1YTg4YmM0MGZiODVjMyIsInN1YiI6IjY2NGI3NTRjZTM0ZjYyMDMyYTU0ODFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oK3lbGYTBQmTDk5eIZq9zKBePNakj-Y2NYY4cOATfug'
        }
      };
      
      fetch(apiUrl, options)
        .then(response => response.json())
        .then(results => displayMovies(results.results))//displayMovies(results))
        .catch(err => console.error(err));
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = ''; // Clear previous movies
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
        <a href=detail_page.html?id=${movie.id}>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        </a>
            <p>Rating: ${movie.overview}</p>
        `;
        moviesContainer.appendChild(movieItem);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzUwZDJiN2ZiYTA3ODAxNzE1YTg4YmM0MGZiODVjMyIsInN1YiI6IjY2NGI3NTRjZTM0ZjYyMDMyYTU0ODFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oK3lbGYTBQmTDk5eIZq9zKBePNakj-Y2NYY4cOATfug'
        }
      };
      
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(data => {
            const genresContainer = document.getElementById('genres');
            data.genres.forEach(genre => {
                const genreItem = document.createElement('div');
                genreItem.className = 'genre-item';
                genreItem.innerHTML = `
                    <input type="checkbox" id="genre-${genre.id}" value="${genre.id}">
                    <label for="genre-${genre.id}">${genre.name}</label>
                `;
                genresContainer.appendChild(genreItem);
            });
        })
        .catch(error => console.error('Error fetching genres:', error));
});
