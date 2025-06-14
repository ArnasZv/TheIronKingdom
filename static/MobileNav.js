//Toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menuToggle');
    const nav = document.getElementById ('navbar');

    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});