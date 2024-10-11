const objectGallery = document.getElementById('objectGallery');
const showButton = document.getElementById('plus-button');
const gallerySquare = document.getElementById('gallerySquare');
const gameScreen = document.getElementById('pageScreen');

var objectGalleryIsDisplayed = false;
var objectSelected = null;
var initialWidth;
var initialHeight;


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
                /*
                const { dx, dy } = event;
                initialWidth = dx;
                initialHeight = dy;
                */
                const { rect } = event;
                initialWidth = event.rect.width;
                initialHeight = event.rect.height;
                
            },
            move(event) {
                /*
                const { dx, dy } = event;
                const newWidth = initialWidth + (dx - initialWidth);
                const newHeight = initialHeight + (dy - initialHeight);
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                */
                
                const { rect } = event;
                const newWidth = initialWidth + (rect.width - initialWidth);
                const newHeight = initialHeight + (rect.height - initialHeight);
                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                
            },
        },
    });
}

/*
interact().draggable({
    listeners: {
        move(event) {
            const { dx, dy } = event;
            const newX = parseFloat(resizableDiv.getAttribute('data-x') || 0) + dx;
            const newY = parseFloat(resizableDiv.getAttribute('data-y') || 0) + dy;

            resizableDiv.style.transform = `translate(${newX}px, ${newY}px)`;
            resizableDiv.setAttribute('data-x', newX);
            resizableDiv.setAttribute('data-y', newY);
        },
    },
    }).resizable({
        edges: { left: true, right: true, top: true, bottom: true },
});
*/