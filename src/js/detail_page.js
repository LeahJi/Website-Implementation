document.addEventListener('DOMContentLoaded', () => {

    // Get query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id'); 

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzUwZDJiN2ZiYTA3ODAxNzE1YTg4YmM0MGZiODVjMyIsInN1YiI6IjY2NGI3NTRjZTM0ZjYyMDMyYTU0ODFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oK3lbGYTBQmTDk5eIZq9zKBePNakj-Y2NYY4cOATfug'
        }
      };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); 
            populateFields(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    
    generateShowtimes()
});

function populateFields(data) {
    document.querySelector('.poster img').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    document.querySelector('.poster img').alt = data.title;

    document.querySelector('.details h1').textContent = data.title;
    document.querySelector('.details #date').innerHTML = `<strong>Release Date:</strong> ${data.release_date || 'Unknown'}`;
    document.querySelector('.details #runtime').innerHTML = `<strong>Runtime:</strong> ${data.runtime || 'Unknown'} minutes`;
    document.querySelector('.details #overview').innerHTML = `<strong>Description:</strong> ${data.overview || 'Unknown'}`;
    document.querySelector('.details #vote').innerHTML = `<strong>Averate Rating:</strong> ${data.vote_average || 'Unknown'} (${data.vote_count || '0'} Votes)`;
    document.querySelector('html title').innerHTML = `${data.title}`
}

function generateShowtimes() {
    const showtimes = [
        { cinema: 'Cinema One', times: ['12:00 PM', '3:00 PM', '6:00 PM'] },
        { cinema: 'Cinema Two', times: ['1:00 PM', '4:00 PM', '7:00 PM'] },
        { cinema: 'Cinema Three', times: ['2:00 PM', '5:00 PM', '8:00 PM'] }
    ];

    const showtimesContainer = document.getElementById('showtimes');
    showtimesContainer.innerHTML = '';

    showtimes.forEach(({ cinema, times }) => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong>${cinema}:</strong> ${times.map(time => `<button class="showtime-button" onclick="buyTicket('${cinema}', '${time}')">${time}</button>`).join(' ')}`;
        showtimesContainer.appendChild(paragraph);
    });
}
