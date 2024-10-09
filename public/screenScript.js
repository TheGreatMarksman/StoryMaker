const objectGallery = document.getElementById('objectGallery');
const showButton = document.getElementById('plus-button');

var objectGalleryIsDisplayed = false;

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
