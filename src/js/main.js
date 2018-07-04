//----------------------<<google map>>----------------------\\
function initMap() {
    const myLatLng = {lat: 40.798054, lng: -74.064936};

    const style = [
        {
          featureType: "all",
          elementType: "all",
          stylers: [
            { saturation: -100 }
          ]
        }
    ];

    const map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrey']
       }
    });

    const mapType = new google.maps.StyledMapType(style, { name:"Greyscale" });
          map.mapTypes.set('tehgrey', mapType);
          map.setMapTypeId('tehgrey');

    const marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: "A R K A N A",
        icon: "assets/img/svg/marker.svg"
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

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
    });

    //----------------------<<menu link hover>>----------------------\\
    // $(".menu-categories__link").on({
    
    //     mouseenter: function(){

    //         const $this = $(this);

    //         $this.addClass('active')
    //             .siblings()
    //             .removeClass('active');
    //     },

    //     "mouseleave click": function(){

    //         const $this = $(this);

    //         $this.removeClass('active');
    //     }
    // });

    //----------------------<<basket sidebar>>----------------------\\
    $('#basket-trigger').on('click', function (e) {

        e.preventDefault();

        sidebarAnimate(350);

    });

    $('#basket-close').on('click', function (e) {

        e.preventDefault();

        sidebarAnimate(0);

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

    //----------------------<<sidebar checkbox>>----------------------\\

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