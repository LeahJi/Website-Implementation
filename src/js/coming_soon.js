document.addEventListener('DOMContentLoaded', () => {

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    // Format dates as YYYY-MM-DD
    const formatDate = (date) => date.toISOString().split('T')[0];
    const todayStr = formatDate(today);
    const nextMonthStr = formatDate(nextMonth);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzUwZDJiN2ZiYTA3ODAxNzE1YTg4YmM0MGZiODVjMyIsInN1YiI6IjY2NGI3NTRjZTM0ZjYyMDMyYTU0ODFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oK3lbGYTBQmTDk5eIZq9zKBePNakj-Y2NYY4cOATfug'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${todayStr}&primary_release_date.lte=${nextMonthStr}2&sort_by=primary_release_date.asc`, options)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const futureMoviesDiv = document.getElementById('future-movies');
            futureMoviesDiv.innerHTML = ''; // Clear any existing content

            movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
                poster.alt = movie.title;

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const releaseDate = document.createElement('p');
                releaseDate.classList.add('release-date');
                releaseDate.textContent = `Release Date: ${movie.release_date}`;

                movieDiv.appendChild(poster);
                movieDiv.appendChild(title);
                movieDiv.appendChild(releaseDate);

                futureMoviesDiv.appendChild(movieDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
