# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

#= require ion.rangeSlider.min
#= require markerclusterer

$ ->  
  $('.tag').click ->
    $('.sidebar').toggleClass('hide_bar');
