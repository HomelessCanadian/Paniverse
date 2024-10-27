// This script will run if JavaScript is enabled
document.addEventListener('DOMContentLoaded', function () {
    var warningBanner = document.getElementById('warning-banner');
    var noscriptWarning = warningBanner.querySelector('noscript');
    if (noscriptWarning) {
        warningBanner.removeChild(noscriptWarning);
    }
});
