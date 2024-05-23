const params = new URLSearchParams(window.location.search);
const movieName = params.get('movie'); 
const venue = params.get('venue'); 
const time = params.get('time'); 

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#movie-title').innerHTML = `For ${movieName}`;
    document.querySelector('#venue-time').innerHTML = `At ${venue}, ${time}`;
})

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        cardholderName: document.getElementById('cardholder-name').value,
        cardNumber: document.getElementById('card-number').value,
        expiryDate: document.getElementById('expiry-date').value,
        cvv: document.getElementById('cvv').value
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Payment submitted successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});