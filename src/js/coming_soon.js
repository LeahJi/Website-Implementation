document.addEventListener('DOMContentLoaded', () => {

    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1); // we want movies that are due to release in the next month
  
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
      
      fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=${todayStr}&primary_release_date.lte=${nextMonthStr}2&sort_by=primary_release_date.asc&with_runtime.gte=90&`, options)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            const futureMoviesDiv = document.getElementById('future-movies');
            futureMoviesDiv.innerHTML = ''; // Clear any existing content

            movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');
                const a = document.createElement('a');
                a.href = `detail_page.html?id=${movie.id}`;

                const poster = document.createElement('img');
                if (movie.poster_path){
                  poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}` ;
                }
                else
                {
                  poster.src = `https://via.placeholder.com/100x150.png`; // use a placeholder if the movie poster is not available now
                }

                a.appendChild(poster);
                
                poster.alt = movie.title;

                const movieRightDiv = document.createElement('div');
                movieRightDiv.classList.add('movie-right-div');

                const title = document.createElement('h3');
                title.textContent = movie.title;

                const releaseDate = document.createElement('p');
                releaseDate.classList.add('release-date');
                releaseDate.textContent = `To Be Released: ${movie.release_date}`;

                const overview = document.createElement('p');
                overview.classList.add('overview');
                if (movie.overview){
                  overview.textContent = `${truncateString(movie.overview)}`;
                }else{overview.textContent = "[Plot overview unavailable]"}
                

                movieDiv.appendChild(a);
                movieDiv.appendChild(movieRightDiv)
                movieRightDiv.appendChild(title);
                movieRightDiv.appendChild(releaseDate);
                movieRightDiv.appendChild(overview)

                futureMoviesDiv.appendChild(movieDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

// Helper function for shortening the movie description.
// with the help of ChatGPT-4o 
function truncateString(str) {
  const maxLength = 140;
  if (str.length > maxLength) {
      let truncated = str.substring(0, maxLength);
      let lastSpaceIndex = truncated.lastIndexOf(" ");
      if (lastSpaceIndex > -1) {
          truncated = truncated.substring(0, lastSpaceIndex);
      }
      return truncated + "...";
  } else {
      return str;
  }
}