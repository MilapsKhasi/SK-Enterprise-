function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(s => s.style.display = 'none');

    // Show selected screen
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0); // Reset scroll to top
    }
}
