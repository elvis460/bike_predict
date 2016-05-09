class HomesController < ApplicationController
  def index
    @locations = StationInfo.all
    render json: @locations
    return
  end
end
