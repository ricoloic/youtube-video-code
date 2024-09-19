const noButton = document.getElementById('no-button');

console.log(noButton);

noButton.addEventListener('click', function (event) {
    event.preventDefault();

    noButton.style.position = 'absolute';
    noButton.style.left = `${parseInt(Math.random() * (window.innerWidth - noButton.offsetWidth))}px`;
    noButton.style.top = `${parseInt(Math.random() * (window.innerHeight - noButton.offsetHeight))}px`;
});
