const SQUARE_LENGTH = Math.floor(20 * window.innerHeight / 100);

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
    let left = mouse.clientX - gameScreen.offsetLeft;
    let top = mouse.clientY - gameScreen.offsetTop;

    /*
    console.log("left " + left);
    console.log("mouseX " + mouse.clientX);
    console.log("leftside " + gameScreen.offsetLeft);
    console.log("top " + top);
    console.log("right " + right);
    console.log("bottom " + bottom);
    console.log("leftside " + gameScreen.offsetLeft);
    console.log("topside " + gameScreen.offsetTop);
    console.log("screen width " + gameScreen.offsetWidth);
    console.log("screen height " + gameScreen.offsetHeight);
    console.log("square width " + SQUARE_LENGTH);
    */

    let correctedCoordinates = boundaryFitXY(newElement, left, top);
    left = correctedCoordinates.left;
    top = correctedCoordinates.top;

    newElement.style.left = left + 'px';
    newElement.style.top = top + 'px';

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

                // Get the current positions from style.left and style.top
                let currentX = parseFloat(window.getComputedStyle(element).left) || 0;
                let currentY = parseFloat(window.getComputedStyle(element).top) || 0;

                // Calculate new positions
                let newX = currentX + dx;
                let newY = currentY + dy;

                let correctedCoordinates = boundaryFitXY(element, newX, newY);
                newX = correctedCoordinates.left;
                newY = correctedCoordinates.top;

                // Update the element's position
                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
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
                const { rect, deltaRect } = event;
                /*
                console.log("width " + rect.width);
                console.log("height " + rect.height);
                console.log("game width " + gameScreen.offsetWidth);
                console.log("game height " + gameScreen.offsetHeight);
                */
                let newWidth = Math.min(rect.width, gameScreen.offsetWidth);
                let newHeight = Math.min(rect.height, gameScreen.offsetHeight);
                /*
                console.log("new width " + newWidth);
                console.log("new height " + newHeight);
                */
                let newX = (parseFloat(window.getComputedStyle(element).left) || 0) + deltaRect.left;
                let newY = (parseFloat(window.getComputedStyle(element).top) || 0) + deltaRect.top;

                let correctedCoordinates = boundaryFitXY(element, newX, newY);
                newX = correctedCoordinates.left;
                newY = correctedCoordinates.top;

                element.style.width = newWidth + 'px';
                element.style.height = newHeight + 'px';
                
                element.style.left = newX + 'px';
                element.style.top = newY + 'px';
            },
        },
    });
}

function boundaryFitXY(element, left, top) {
    let width = parseFloat(window.getComputedStyle(element).width) || 0;
    let height = parseFloat(window.getComputedStyle(element).height) || 0
    let right = left + width;
    let bottom = top + height;

    let leftBoundary = gameScreen.offsetLeft;
    let topBoundary = gameScreen.offsetTop;
    let rightBoundary = leftBoundary + gameScreen.offsetWidth;
    let bottomBoundary = topBoundary + gameScreen.offsetHeight;

    if (left < leftBoundary) {
        left = leftBoundary;
    }
    if (top < topBoundary) {
        top = topBoundary;
    }
    if (right > rightBoundary) {
        left = rightBoundary - width;
    }
    if (bottom > bottomBoundary) {
        top = bottomBoundary - height;
    }

    return { left, top };
}
