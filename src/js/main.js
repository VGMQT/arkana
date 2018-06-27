$(document).ready(function () {

    //----------------------<<svg for ie>>----------------------\\
    svg4everybody();

    const mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-nx',
            prevEl: '.swiper-button-pr'
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    })
});