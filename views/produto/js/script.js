function moveLine1() {
    var line = document.querySelector('.line');
    var titleText = document.querySelector('.title-text');
    titleText.parentNode.insertBefore(line, titleText.nextSibling);

    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes slideLine {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(0%);
            }
        }`;

    document.head.appendChild(styleSheet);
}

function moveLine2() {
    var line = document.querySelector('.line');
    var titleTextTwo = document.querySelector('.title-text-two');
    titleTextTwo.parentNode.insertBefore(line, titleTextTwo.nextSibling);

    var styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes slideLine {
            0% {
                transform: translateX(-100%);
            }
            100% {
                transform: translateX(0%);
            }
        }`;

    document.head.appendChild(styleSheet);
}
