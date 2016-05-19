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
    disableDefaultUI: true,
    //scrollwheel: false,
    center: {lat: 25.0130679, lng: 121.5416515}
  });


//search box
  var input = document.getElementById('pac-input');
  var search_box = document.getElementById('searchbox');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(search_box);



  var infowindow = new google.maps.InfoWindow();

 // if (navigator.geolocation) {
 //    navigator.geolocation.getCurrentPosition(function(position) {
 //      var pos = {
 //        lat: position.coords.latitude,
 //        lng: position.coords.longitude
 //      };

 //      infowindow.setPosition(pos);
 //      infowindow.setContent('Location found.');
 //      map.setCenter(pos);
      
 //    }, function() {
 //      handleLocationError(true, infowindow, map.getCenter());
 //    });
 //  } else {
 //    // Browser doesn't support Geolocation
 //    handleLocationError(false, infowindow, map.getCenter());
 //  }

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
            // var contentString = '<div id="content" style="width:400px;">'+
            // '<div class="header"><h1 style="color:blue;font-size: 20px">'+response['station_info'].sname+
            // '<i class="fa fa-star" style="float:right;font-size: 26px;color:black"></i></h1>'+
            // '<p style="color:blue">'+response['station_info'].addr+'</p></div>'+
            // '<div class="infos_img"><div class="car_info" style="display: inline-block;">'+
            // '<p style="display:inline-block;font-size: 80px"><i class="fa fa-smile-o"></i></p>'+
            // '<p id="font_big"style="display:inline-block;font-size: 24px">'+'<span id="available_bike">'+response['predict_info'][0].count+'</span>'+'<span style="font-size: 20px">/'+response['station_info'].total+'台<span></p></div>'+
            // '<div class="weather_info" style="display: inline-block;">'+
            // '<p style="display:inline-block;font-size: 80px"><i class="fa fa-tint"></i></p>'+
            // '<p style="display:inline-block;font-size: 30px;">23°C</p></div>'+
            // '</div><input type="text" id="range"/>'+'<ul class="tab"><li><div class="mins">分鐘</div></li><li><div class="hurs">小時</div></li></ul>'+
            // '</div>';
            // infowindow.close();
            // infowindow = new google.maps.InfoWindow({
            //   content: contentString
            // });
            // infowindow.open(map, marker);
            
            //range slider
              // $("#range").ionRangeSlider({
              //     grid: true,
              //     min: 0,
              //     max: 100,
              //     from: 0,
              //     step: 5,
              //     prefix: "After ",
              //     postfix: " minutes",
              // });

              //initialize

              $('#content').show();
              $('#location_name').text(response['station_info'].sname);
              $('#location_addr').text(response['station_info'].addr);
              $('.total_bike').text("/"+response['station_info'].total+"台");
              $('.avaliable_bike').text(response['weather'].count);
              $('.weather_value').text(response['weather'].temp+"°C");
              switch(response['weather'].status) {
                case 'Overcast':
                case 'Mostly Cloudy':
                    $('.weather_img > img').attr('src' , $('#image_path').data('mostly_cloudy'))
                break;
                case 'Heavy Rain Showers':
                case 'Light Drizzle':
                case 'Rain':
                case 'Rain Showers':
                case 'Light Rain Showers':
                  $('.weather_img > img').attr('src' , $('#image_path').data('raining'))
                break;
                case 'Partly Cloudy':
                case 'Scattered Clouds':
                  $('.weather_img > img').attr('src' , $('#image_path').data('scatterd_clouds'))
                break;
                case 'Light Thunderstorms and Rain':
                case 'Heavy Thunderstorms and Rain':
                case 'Thunderstorm':
                case 'Thunderstorms and Rain':
                  $('.weather_img > img').attr('src' , $('#image_path').data('thunderstorm'))
                break;
                default:
                    $('.weather_img > img').attr('src' , $('#image_path').data('blank_sunny'))
              }
              if(response['weather'].count < 5){
                  $('.bike_img > img').attr('src',$('#image_path').data('bad'))
                }else if(response['weather'].count < 15){
                  $('.bike_img > img').attr('src',$('#image_path').data('mid'))
                }else{
                  $('.bike_img > img').attr('src',$('#image_path').data('good'))
                } 

              

              for (var j = 0; j < markers.length; j++) {
                markers[j].setIcon(unclick_icon);
              }
              marker.setIcon(clicked_icon);
              // console.log($("#range").data("clock"));
              //if($("#range").data("clock") == "mins"){  
              $('#range').data('clock','mins');
                var slider = $("#range").data("ionRangeSlider");
                  slider.update({
                    min: 0,
                    max: 60,
                    postfix: " 分鐘後",
                    from: 0,
                    step: 5,
                  });
              $("#range").off("change");
              $("#range").on("change", function () {
                from = $(this).data("from");
                $('.avaliable_bike').text(response['predict_info'][(from/5)].count);
                $('.datetime').text(moment(response['time_now']).add(from,'minutes').calendar());                  
                if(response['predict_info'][(from/5)].count < 5){
                  $('.bike_img > img').attr('src',$('#image_path').data('bad'))
                }else if(response['predict_info'][(from/5)].count < 15){
                  $('.bike_img > img').attr('src',$('#image_path').data('mid'))
                }else{
                  $('.bike_img > img').attr('src',$('#image_path').data('good'))
                } 
              }); 
              // }else{
              //   $("#range").on("change", function () {
              //       console.log('in 222');
              //       from = $(this).data("from");
              //       $('.avaliable_bike').text(response['predict_info'][(from*12)].count)
              //   });
              // }

              //切換小時分鐘
              $('.mins').on('click',function(){
                // $('.datetime').text(moment(response['time_now']).add(from,'hours').calendar());
                $('.hurs').removeClass('tabe_active');
                $(this).addClass('tabe_active');
                $('#range').data('clock','mins');
                var slider = $("#range").data("ionRangeSlider");
                  slider.update({
                    min: 0,
                    max: 60,
                    postfix: " 分鐘後",
                    from: $("#range").data("from"),
                    step: 5,
                  });
                $("#range").off("change");
                $("#range").on("change", function () {
                  from = $(this).data("from");
                  $('.avaliable_bike').text(response['predict_info'][(from/5)].count);
                  $('.datetime').text(moment(response['time_now']).add(from,'minutes').calendar());                  
                  if(response['predict_info'][(from/5)].count < 5){
                    $('.bike_img > img').attr('src',$('#image_path').data('bad'))
                  }else if(response['predict_info'][(from/5)].count < 15){
                    $('.bike_img > img').attr('src',$('#image_path').data('mid'))
                  }else{
                    $('.bike_img > img').attr('src',$('#image_path').data('good'))
                  } 
                });
              });
              $('.hurs').on('click',function(){
                // $('.datetime').text(moment(response['time_now']).add(from,'hours').calendar());
                $('.mins').removeClass('tabe_active');
                $(this).addClass('tabe_active');
                $('#range').data('clock','hour');
                var slider = $("#range").data("ionRangeSlider");
                slider.update({
                  min: 0,
                  max: 24,
                  postfix: " 點",
                  from: 0,
                  step: 1
                });
                $("#range").off("change");
                $("#range").on("change", function () {
                    console.log('in 222');
                    from = $(this).data("from");
                    $('.avaliable_bike').text(response['predict_info'][(from*12)].count)
                    $('.datetime').text(moment(response['time_now']).add(from,'hours').calendar());
                    if(response['predict_info'][(from*12)].count < 5){
                      $('.bike_img > img').attr('src',$('#image_path').data('bad'))
                    }else if(response['predict_info'][(from*12)].count < 15){
                      $('.bike_img > img').attr('src',$('#image_path').data('mid'))
                    }else{
                      $('.bike_img > img').attr('src',$('#image_path').data('good'))
                    } 
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
        textColor: '#FFB600',
        url: $('#map').data('cluster'),
        height: 50,
        width: 50,
        textSize: 14
      },
     {
        textColor: '#FFB600',
        url: $('#map').data('cluster'),
        height: 50,
        width: 50,
        textSize: 14
      },
     {
        textColor: '#FFB600',
        url: $('#map').data('cluster'),
        height: 50,
        width: 50,
        textSize: 14
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
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
// }