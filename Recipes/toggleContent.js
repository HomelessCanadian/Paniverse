function toggleContent() {
    const dynamicContent = document.getElementById('dynamic-content');
    const toggleButton = document.getElementById('toggle-button');

    if (dynamicContent.style.display === 'none' || dynamicContent.style.display === '') {
        dynamicContent.style.display = 'block';
        toggleButton.textContent = 'Hide monloug';
    } else {
        dynamicContent.style.display = 'none';
        toggleButton.textContent = 'Show monoloug';
    }
}
