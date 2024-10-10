const objectGallery = document.getElementById('objectGallery');
const showButton = document.getElementById('plus-button');
const gallerySquare = document.getElementById('gallerySquare');
const gameScreen = document.getElementById('inner-rectangle');

var objectGalleryIsDisplayed = false;
var objectSelected = null;

showButton.addEventListener('click', () => {
    if(objectGalleryIsDisplayed){
        objectGallery.style.display = 'none';
        objectGalleryIsDisplayed = false;
        showButton.innerHTML = '+';
    }
    else{
        objectGallery.style.display = 'block';
        objectGalleryIsDisplayed = true;
        showButton.innerHTML = '-';
    }
});

gallerySquare.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., text selection)
    
    document.addEventListener('mouseup', (e) => {
        const newElement = document.createElement('div');
        newElement.classList.add('square');
        newElement.style.left = e.clientX - gameScreen.getBoundingClientRect().left + 'px';
        newElement.style.top = e.clientY - gameScreen.getBoundingClientRect().top + 'px';
        gameScreen.appendChild(newElement);
    });
});

