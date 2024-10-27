let hue = 0;

function changeColor() {
    hue = (hue + 1) % 360; // Increment hue by 10 degrees, wrapping around at 360
    const newColor = `hsl(${hue}, 100%, 80%)`; // High saturation, light color
    const highlights = document.querySelectorAll('#warning-banner');
    highlights.forEach(function (element) {
        element.style.backgroundColor = newColor;
    });
}

setInterval(changeColor, 10);

