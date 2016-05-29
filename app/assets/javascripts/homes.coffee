# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#= require ion.rangeSlider.min
#= require markerclusterer
#= require moment

$ ->  
  #$('#menu').click ->
    #$('.sidebar').toggleClass('show_side_bar');
    #$('#map').toggleClass('shift_map');
  $("#range").ionRangeSlider({
    grid: true,
    min: 0,
    max: 100,
    from: 0,
    step: 5,
    postfix: " 分鐘後",
	});
  $('.star').click ->
    $('#content').hide();