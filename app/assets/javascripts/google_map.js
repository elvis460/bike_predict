function initMap() {
//get locations
  var locations = $('#map').data('locations')
  var clicked_icon = {
    url: $('#map').data('clicked'),
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  var unclick_icon = {
    url: $('#map').data('unclick'),
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  var markers = []
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: {lat: 25.0130679, lng: 121.5416515}
  });

//search box
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);



  var infowindow = new google.maps.InfoWindow();
  var marker , i;
  for(i = 0 ; i < locations.length ; i++){
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1],locations[i][2]),
      id: locations[i][0],
      icon: unclick_icon,
      map: map
    });
    markers.push(marker);

  //location click event
    google.maps.event.addListener(marker, 'click' , (function(marker,i){
      return function(){
        $.ajax({
          method : 'get',
          url : '/homes/get_info',
          data : {
            location_id : marker.id,
          },
          success : function(response) {
            var contentString = '<div id="content" style="width:400px;">'+
            '<div class="header"><h1 style="color:blue;font-size: 20px">'+response['station_info'].sname+
            '<i class="fa fa-star" style="float:right;font-size: 26px;color:black"></i></h1>'+
            '<p style="color:blue">'+response['station_info'].addr+'</p></div>'+
            '<div class="infos_img"><div class="car_info" style="display: inline-block;">'+
            '<p style="display:inline-block;font-size: 80px"><i class="fa fa-smile-o"></i></p>'+
            '<p id="font_big"style="display:inline-block;font-size: 24px">'+'<span id="available_bike">'+response['predict_info'][0].count+'</span>'+'<span style="font-size: 20px">/'+response['station_info'].total+'台<span></p></div>'+
            '<div class="weather_info" style="display: inline-block;">'+
            '<p style="display:inline-block;font-size: 80px"><i class="fa fa-tint"></i></p>'+
            '<p style="display:inline-block;font-size: 30px;">23°C</p></div>'+
            '</div><input type="text" id="range"/>'+'<ul class="tab"><li><div class="mins">分鐘</div></li><li><div class="hurs">小時</div></li></ul>'+
            '</div>';
            infowindow.close();
            infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            infowindow.open(map, marker);
            for (var j = 0; j < markers.length; j++) {
              markers[j].setIcon(unclick_icon);
            }
            marker.setIcon(clicked_icon);
            //range slider
              $("#range").ionRangeSlider({
                  grid: true,
                  min: 0,
                  max: 100,
                  from: 0,
                  step: 5,
                  prefix: "After ",
                  postfix: " minutes",
              });
              if($("#range").data("max") == 100){
                $("#range").on("change", function () {
                    from = $(this).data("from"),
                    $('#available_bike').text(response['predict_info'][(from/5)].count)
                });
              }else{
                $("#range").on("change", function () {
                    from = $(this).data("from"),
                    $('#available_bike').text(response['predict_info'][(from*12)].count)
                });
              }
              //切換小時分鐘，目前取值還沒改好
              $('.mins').on('click',function(){
              var slider = $("#range").data("ionRangeSlider");
                slider.update({
                  min: 0,
                  max: 100,
                  postfix: " minutes",
                  from: $("#range").data("from"),
                  step: 5,
                });
              });
              $('.hurs').on('click',function(){
                var slider = $("#range").data("ionRangeSlider");
                slider.update({
                  min: 0,
                  max: 24,
                  postfix: " hours",
                  from: $("#range").data("from")/60,
                  step: 1
                });
              });
            }
        });
        
       
      }
    })(marker,i));

  }
  //叢集縮放點圖案
    var clusterStyles = [
      {
        textColor: 'white',
        url: $('#map').data('unclick'),
        height: 50,
        width: 50
      },
     {
        textColor: 'white',
        url: $('#map').data('unclick'),
        height: 50,
        width: 50
      },
     {
        textColor: 'white',
        url: $('#map').data('unclick'),
        height: 50,
        width: 50
      }
    ];
    var mcOptions = {gridSize: 50, maxZoom: 15,styles:clusterStyles};
    var markerclusterer = new MarkerClusterer(map, markers,mcOptions);


  //map rwd
  google.maps.event.addDomListener(window, "resize", function() {
   var center = map.getCenter();
   google.maps.event.trigger(map, "resize");
   map.setCenter(center); 
  });
}