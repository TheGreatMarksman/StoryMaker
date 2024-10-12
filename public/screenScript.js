const objectGallery = document.getElementById('objectGallery');
const showButton = document.getElementById('plus-button');
const gallerySquare = document.getElementById('gallerySquare');
const gameScreen = document.getElementById('pageScreen');

var objectGalleryIsDisplayed = false;
var objectSelected = null;

var initialWidth;
var initialHeight;
var initialX;
var initialY;


showButton.addEventListener('click', () => {
    //console.log("gallerysquare: " + gallerySquare.style.zIndex);
    if (objectGalleryIsDisplayed) {
        objectGallery.style.display = 'none';
        objectGalleryIsDisplayed = false;
        showButton.innerHTML = '+';
    }
    else {
        objectGallery.style.display = 'block';
        objectGalleryIsDisplayed = true;
        showButton.innerHTML = '-';
    }
});

gallerySquare.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., text selection)

    document.addEventListener('mouseup', placeRect);
});


function placeRect(mouse) {
    const newElement = document.createElement('div');
    newElement.classList.add('square');
    newElement.style.left = mouse.clientX - gameScreen.getBoundingClientRect().left + 'px';
    newElement.style.top = mouse.clientY - gameScreen.getBoundingClientRect().top + 'px';

    addResizability(newElement);

    gameScreen.appendChild(newElement);
    document.removeEventListener('mouseup', placeRect);
}

function addResizability(element) {
    const resizeInstance = interact(element);
    resizeInstance.draggable({
        listeners: {
            move(event) {
                const { dx, dy } = event;
                const newX = parseFloat(element.getAttribute('data-x') || 0) + dx;
                const newY = parseFloat(element.getAttribute('data-y') || 0) + dy;

                element.style.transform = `translate(${newX}px, ${newY}px)`;
                element.setAttribute('data-x', newX);
                element.setAttribute('data-y', newY);
            },
        },
    });
    resizeInstance.resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
            start(event) {
                const { rect } = event;
                initialWidth = rect.width;
                initialHeight = rect.height;
            },
            move(event) {
                const { rect, deltaRect} = event;
                const newWidth = rect.width;
                const newHeight = rect.height;

                const newX = parseFloat(element.getAttribute('data-x') || 0) + deltaRect.left;
                const newY = parseFloat(element.getAttribute('data-y') || 0) + deltaRect.top;

                element.style.width = `${newWidth}px`;
                element.style.height = `${newHeight}px`;
                //console.log("before: " + element.style.left);
                element.style.transform = `translate(${newX}px, ${newY}px)`;
                //console.log("after: " + element.style.left);
                
                element.setAttribute('data-x', newX);
                element.setAttribute('data-y', newY);
            },
        },
    });
    /*
    resizeInstance.resizable({
        edges: { left: true, right: true, top: true, bottom: true },
        listeners: {
            start(event) {
                const { rect } = event;
                initialWidth = rect.width;
                initialHeight = rect.height;
                initialX = parseFloat(element.getAttribute('data-x') || 0);
                initialY = parseFloat(element.getAttribute('data-y') || 0);
            },
            move(event) {
                const { rect, deltaRect} = event;
                const newWidth = rect.width;
                const newHeight = rect.height;

                const newX = initialX + deltaRect.left;
                const newY = initialY + deltaRect.top;

                element.style.width = `${newWidth}px`;
                element.style.height = `${newHeight}px`;
                //console.log("before: " + element.style.left);
                element.style.transform = `translate(${newX}px, ${newY}px)`;
                //console.log("after: " + element.style.left);
                
                element.setAttribute('data-x', newX);
                element.setAttribute('data-y', newY);
            },
        },
    });
    */
}
