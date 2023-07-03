
/*Banner rotativo*/
var images = document.querySelectorAll('.banner img');
    var currentImageIndex = 0;

    function changeImage(n) {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex += n;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        images[currentImageIndex].classList.add('active');
    }

/*Scrollagem dos cards*/
function scrollCardsRight() {
    const container = document.querySelector('.card-container');
    container.scrollBy({ left: 600, behavior: 'smooth' });
}

function scrollCardsLeft() {
    const container = document.querySelector('.card-container');
    container.scrollBy({ left: -600, behavior: 'smooth' });
}