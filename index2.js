const button = document.getElementById("btn");
const windowWidth = window.screen.width;
const windowHeight = window.screen.height;



button.addEventListener ('click', () => {
    alert('Screen size ' + windowWidth + ' x ' + windowHeight)
})