function helpers() {
    var nav = $('.navbar')[0];
    requestAnimationFrame(navigationEffect);

    function navigationEffect() {
        if (window.scrollY >= 70) {
            nav.style.background = '#F6F6EF';
            nav.classList.add('nav-moveFromTopFade');
        } else {
            nav.classList.remove('nav-moveFromTopFade');
            nav.style.background = 'transparent';
        }

        requestAnimationFrame(navigationEffect);
    }
}