namespace :events do
  
  task update_weather: :environment do
    require 'rest-client'
    response = RestClient.get 'http://chenhon.twbbs.org:7000/weather'
    weathers = []
    weather = JSON.parse(response)
    weather.each do |result|
      weathers << Weather.new(station_info_id: result['sno'],temp: result['Temp'] , status: result['Weather'] ,count: result['available'])
    end
    Weather.delete_all
    Weather.import weathers
  end

  task update_predict: :environment do
    require 'rest-client'
    response = RestClient.get 'http://chenhon.twbbs.org:7000/data'
    predict_json = JSON.parse(response)
    predicts = []
    predict_json.each do |data|
      data['result'].each do |result|
        predicts << PredictInfo.new(time: result['lastUpdate'] , count: result['available'] , station_info_id: data['id'])
      end
    end
    PredictInfo.delete_all
    PredictInfo.import predicts
  end
end