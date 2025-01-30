function changeImage(element) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = element.src;
}
function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('open');
}
