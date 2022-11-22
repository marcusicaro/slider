const frame = document.getElementById('frame');
const container = document.getElementById('container');
var containerLength = container.getElementsByTagName('div').length;
var currentFrame = 0;
const frameHeigth = document.getElementById(`${currentFrame}`).offsetHeight;
const frameWidth = document.getElementById(`${currentFrame}`).offsetWidth;
const rightArrow = document.querySelector('.right-arrow');
const leftArrow = document.querySelector('.left-arrow');
const dotsContainer = document.querySelector('.dots-container');
const dotsList = document.getElementsByClassName('dot');

function nextFrame () {
    if (currentFrame < (containerLength - 1)){
        removeCurrent();
        var currentRight = parseInt(container.style.right || 0);
        container.style.right = currentRight + frameWidth + 'px';
        currentFrame += 1;
        dotsList[currentFrame].classList.add('current');
        frameSize(
            document.getElementById(currentFrame).offsetHeight, 
            document.getElementById(currentFrame).offsetWidth
        );
    } return
};

function previousFrame () {
    if (currentFrame > 0) {
        removeCurrent();
        currentFrame -= 1;
        dotsList[currentFrame].classList.add('current');
        container.style.right = (
            parseInt(container.style.right) 
            - document.getElementById(currentFrame).offsetWidth 
            + 'px'
        );
        frameSize(frameHeigth, frameWidth);
    } return
};

function frameSize (height, width) {
frame.style.height = `${height}px`;
frame.style.width = `${width}px`;
};

const createDots = (() => {
    for (let i = 0; i < containerLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
        dot.addEventListener('click', () => {
            removeCurrent();
            dot.classList.add('current');
            if (currentFrame > i) {
                let result = currentFrame - i;
                for (let a = 0; a < result; a++){
                    previousFrame();
                }
            } else if (currentFrame < i) {
                let result = i - currentFrame;
                for (let b = 0; b < result; b++){
                    nextFrame();
                }
            } return
        })
    }
})();

function removeCurrent () {
    for (let c = 0; c < dotsList.length; c++){
    dotsList[c].classList.remove('current');
    }
}

dotsList[0].classList.add('current');
rightArrow.addEventListener('click', nextFrame);
leftArrow.addEventListener('click', previousFrame);
frameSize(frameHeigth, frameWidth);
setInterval(nextFrame, 3500);