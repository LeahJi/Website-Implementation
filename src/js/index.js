let currentIndex = 2; // Start with the middle card selected

function updateCarousel() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.remove('selected');
        card.classList.remove('hidden');
        card.style.transform = `translateX(${(index - currentIndex) * 50}%)`;
        card.style.opacity = '0.5';

        if (index === currentIndex) {
            card.classList.add('selected');
            card.style.transform = `translateX(${(index - currentIndex) * 50}%) scale(1.5)`;
            card.style.opacity = '1';
        } else if (Math.abs(index - currentIndex) > 2) {
            card.classList.add('hidden');
        }
    });
}

function prevCard() {
    const cards = document.querySelectorAll('.card');
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = cards.length - 1; // Loop back to the last card
    }
    updateCarousel();
}

function nextCard() {
    const cards = document.querySelectorAll('.card');
    if (currentIndex < cards.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first card
    }
    updateCarousel();
}

updateCarousel();


document.addEventListener('DOMContentLoaded', () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzUwZDJiN2ZiYTA3ODAxNzE1YTg4YmM0MGZiODVjMyIsInN1YiI6IjY2NGI3NTRjZTM0ZjYyMDMyYTU0ODFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oK3lbGYTBQmTDk5eIZq9zKBePNakj-Y2NYY4cOATfug'
        }
      };
      
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(response => response.json())
        .then(data => {
            createCarousel(data.results.slice(0, 5)); // Only take the first 5 results
        })
        .catch(error => console.error('Error fetching data:', error));
});

function createCarousel(results) {
    const carousel = document.querySelector('.carousel');
    results.forEach(result => {
        const item = document.createElement('div');
        item.classList.add('card');
        item.innerHTML = `
        <a href="detail_page.html?id=${result.id}">
            <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
            <h5>${result.title}</h5>
        </a>
        `;
        carousel.appendChild(item);
    });
    updateCarousel();
}

