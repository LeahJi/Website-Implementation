const cards = document.querySelectorAll('.card');
const dots = document.querySelectorAll('.dot');
let current = 0;

function updateCarousel(index) {
    const carousel = document.querySelector('.carousel-container');
    const cardWidthPercent = 20; // Each card + margin is 20% of the carousel width
    // Calculate the necessary translation to center the card
    const centerOffsetPercent = 50 - cardWidthPercent / 2;
    const transformPercentage = index * cardWidthPercent - centerOffsetPercent;

    carousel.style.transform = `translateX(-${transformPercentage}%)`;
    cards.forEach(card => card.classList.remove('enlarged'));
    cards[index].classList.add('enlarged');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}


dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        current = index;
        updateCarousel(current);
    });
});