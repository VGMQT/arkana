//-------------------------//google map//-------------------------//
function initMap() {

    const myLatLng = {
        lat: 40.798054, lng: -74.064936
    };

    const infoMarker = document.getElementById('infoMarker');

    const myStyle = [{
        featureType: "all",
        elementType: "all",
        stylers: [{
            saturation: -100
        }]
    }];

    const map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrey']
       }
    });

    const mapType = new google.maps.StyledMapType(myStyle, {
        name:"Greyscale"
    });

    map.mapTypes.set('tehgrey', mapType);
    map.setMapTypeId('tehgrey');

    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "A R K A N A",
        icon: "assets/img/svg/marker.svg"
    });

    infoMarker.onclick = function() {
        map.setCenter(myLatLng);
    };
};

//-------------------------//tabs (native js)//-------------------------//
function openList(e, listName) {

    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("trending__products-page");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tabs__button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(listName).style.display = "block";
    e.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

//-------------------------//slideshow (native js)//-------------------------//
let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("products__img-slide");
    const dots = document.getElementsByClassName("color");
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}


//-------------------------//dataset//-------------------------//
// function myFunc(ev, slideId){
//     console.log(slideId);

//     var i, tabcontent, tablinks;

//     tabcontent = document.getElementsByClassName("products__img-static");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }

//     tablinks = document.getElementsByClassName("color");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].className = tablinks[i].className.replace(" active", "");
//     }

//     document.getElementById(slideId).style.display = "block";
//     ev.currentTarget.className += " active";
// }

// document.getElementById("dot1").click();

//-------------------------//document ready functions//-------------------------//
$(document).ready(function () {

    //-------------------------//svg for IE//-------------------------//
    svg4everybody();
    
    //-------------------------//swiper//-------------------------//
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
    });

    //-------------------------//basket sidebar//-------------------------//
    $('#basket-trigger').on('click', function (e) {

        e.preventDefault();

        sidebarAnimate(350);
        $('.dark-bg').fadeIn(500);

    });

    $('#basket-close').on('click', function (e) {

        e.preventDefault();

        sidebarAnimate(0);
        $('.dark-bg').fadeOut(500);

    });

    function sidebarAnimate(width) {

        let flag = true;

        const $basket = $('.basket');
        const duration = 500;

        if(flag) {
            flag = false;

            $basket.animate({
                width: width
            }, duration, function () {
                flag = true;
            });
        }
    }

    //-------------------------//sidebar checkbox//-------------------------//
    $('.basket__products-close').on('click', function (e) {
        e.preventDefault();

        const $this = $(this);

        const $item = $(".basket__products-item"),
              curItem = $this.closest($item),
              duration = 1000;

        curItem.slideUp(duration, function(){

            curItem.remove();

            if($item.length < 2) {

                $('.basket__products-dummy').slideDown(500);

            }
        });
    });

});