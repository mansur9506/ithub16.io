document.addEventListener('DOMContentLoaded', function() {
    const laptops = [
        { id: 1, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 2, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 3, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 4, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 5, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 6, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 7, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 8, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 9, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 10, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 11, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' },
        { id: 12, name: 'Lenovo Legion 6', img: '/public/img/Legion5.jpg', status: 'Свободен' }
    ];

    const laptopGrid = document.querySelector('.laptop-grid');

    laptops.forEach(laptop => {
        const laptopCard = document.createElement('div');
        laptopCard.classList.add('laptop-card');
        laptopCard.innerHTML = `
            <img src="${laptop.img}" alt="${laptop.name}">
            <h3>${laptop.name}</h3>
            <p>${laptop.status}</p>
            <button data-id="${laptop.id}">Забронировать</button>
        `;
        laptopGrid.appendChild(laptopCard);
    });

    document.querySelectorAll('.laptop-card button').forEach(button => {
        button.addEventListener('click', function() {
            const laptopId = this.getAttribute('data-id');
            window.location.href = `booking.html?laptopId=${laptopId}`;
        });
    });
});