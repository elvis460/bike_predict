function initMap() {
  // $('.addrsss').each(function() {
  //   var addressid = $(this).data('id');
  //   var test = "#"+addressid;
  alery($('#map').data('locations'));
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: {lat: 25.0130679, lng: 121.5416515}
  });

  //var image = 'https://image.freepik.com/free-icon/placeholder-on-map-paper-in-perspective_318-61698.png';
  var marker = new google.maps.Marker({
    position: {lat: 25.0130679, lng: 121.5416515},
    map: map,
    //icon: image
  });
  var infowindow = new google.maps.InfoWindow({
    content: "Hi"
  });

    infowindow.open(map, marker);
  // });
}