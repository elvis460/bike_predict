class HomesController < ApplicationController
  def index
    @locations = StationInfo.all.map do |location|
      [location.id, location.lat ,  location.lng  , location.sname]
    end
    # render json: @locations
    # return
  end

  def get_info
    render json: StationInfo.find(params[:location_id])
  end

  def new
    # require 'rest-client'
    # response = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    # render json: response
    # return
    @location = StationInfo.first
  end
end
