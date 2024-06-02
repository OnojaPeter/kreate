const hamburger = document.getElementById('hamburger');
const hamMenu = document.getElementById('hamMenu');
const body = document.body;
const closeIcon = document.getElementById('closeIcon');

hamburger.addEventListener('click', function() {
    // alert('p')
    hamMenu.classList.toggle('open');
    // closeIcon.classList.toggle('hidden');
    body.classList.toggle('menu-open');
});

closeIcon.addEventListener('click', function() {
    hamMenu.classList.toggle('open');
    closeIcon.classList.remove('open');
    body.classList.toggle('menu-open');
});

