class HomesController < ApplicationController
  def index
    @locations = StationInfo.all.map do |location|
      [location.id, location.lat ,  location.lng  , location.sname]
    end
    # render json: @locations
    # return
  end

  def get_info
    station = StationInfo.includes(:predict_infos,:weather).find(params[:location_id].to_i)
    render json: {station_info:  station, predict_info: station.predict_infos.where("time > ?",Time.now+8*60*60) , time_now: Time.now , weather: station.weather}

    #require 'rest-client'
    # #遠端拿回的資料
    # predict_datas = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    # #轉換為json格式
    # predict_json = JSON.parse(predict_datas)[location_id-1]['result'].map do |predict|
    #      [predict['lastUpdate'], predict['available']]
    # end
    # #過濾現在時間以後的data(RDS裡要加8小時)
    # predict_info = predict_json.select{|time,count| time > Time.now+8*60*60}

  end

  def new
    require 'rest-client'
    # response = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    # predict_json = JSON.parse(response)
    # predicts = []
    # predict_json.each do |data|
    #   data['result'].each do |result|
    #     predicts << PredictInfo.new(time: result['lastUpdate'] , count: result['available'] , station_info_id: data['id'])
    #   end
    # end
    # render json:predicts
    # return


    # predicts = []
    # (0..(predict_json.length-1)).each do |index|
    #   predict_json[index]['result'].each do |result|
    #     predicts << PredictInfo.new(time: result['lastUpdate'] , count: result['available'] , station_info_id: (index+1))
    #   end
    # end
    
    # PredictInfo.import predicts
     # response = RestClient.get 'http://chenhon.twbbs.org:7000/weather'
     # weather = JSON.parse(response)
     #  weather.each do |result|
     #    Weather.create(station_info_id: result['sno'],temp: result['Temp'] , status: result['Weather'] ,count: result['available'])
     #  end

    # response = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    # predict_json = JSON.parse(response)
    # #render json: predict_json
    # # PredictInfo.destroy_all
    # (0..(predict_json.length-1)).each do |index|
    #   predict_json[index]['result'].each do |result|
    #     PredictInfo.create(time: result['lastUpdate'] , count: result['available'] , station_info_id: index)
    #   end
    # end 
    # PredictInfo.delete_all


    # response = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    # predict_json = JSON.parse(response)
    # (0..(predict_json.length-1)).each do |index|
    #   predict_json[index]['result'].each do |result|
    #     StationInfo.find(index+1).predict_infos[index].update(time: result['lastUpdate'] , count: result['available'])
    #   end
    # end 


    # result = JSON.parse(response)[4]['result'].map do |test|
    #      [test['lastUpdate'], test['available']]
    # end
    # #render json: result.select{|time,count| time > Time.now}
    #@location = StationInfo.first
  end
end
