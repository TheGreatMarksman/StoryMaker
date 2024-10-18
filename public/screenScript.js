const SQUARE_WIDTH = Math.floor(20 * window.innerWidth / 100);
const SQUARE_HEIGHT = Math.floor(20 * window.innerHeight / 100);

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
    let left = mouse.clientX - gameScreen.getBoundingClientRect().left;
    let top = mouse.clientY - gameScreen.getBoundingClientRect().top;
    let right = left + SQUARE_WIDTH;
    let bottom = top + SQUARE_HEIGHT;

    console.log("left " + left);
    console.log("top " + top);
    console.log("right " + right);
    console.log("bottom " + bottom);
    console.log("leftside " + gameScreen.offsetLeft);
    console.log("topside " + gameScreen.offsetTop);
    console.log("screen width " + gameScreen.getBoundingClientRect().width);
    console.log("screen height " + gameScreen.getBoundingClientRect().height);
    console.log("square width " + SQUARE_WIDTH);
    console.log("square height " + SQUARE_HEIGHT);

    let leftBoundary = gameScreen.offsetLeft;
    let topBoundary = gameScreen.offsetTop;
    let rightBoundary = leftBoundary + gameScreen.offsetWidth;
    let bottomBoundary = topBoundary + gameScreen.offsetHeight;
    
    if(left < leftBoundary){
        left = leftBoundary;
    }
    if(top < topBoundary){
        top = topBoundary;
    }
    if(right > rightBoundary){
        console.log("right adjusted");
        left = rightBoundary - SQUARE_WIDTH;
    }
    if(bottom > bottomBoundary){
        console.log("bottom adjusted");
        top = bottomBoundary - SQUARE_HEIGHT;
    }

    newElement.style.left = Math.floor(left) + 'px';
    newElement.style.top = Math.floor(top) + 'px';

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
    
}
