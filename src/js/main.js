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
    })
});