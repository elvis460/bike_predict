namespace :events do
  task update_weather: :environment do
    require 'rest-client'
    response = RestClient.get 'http://chenhon.twbbs.org:7000/weather'
    Weather.destroy_all
    weather = JSON.parse(response)
    weather.each do |result|
      Weather.create(station_info_id: result['sno'],temp: result['Temp'] , status: result['Weather'] ,count: result['available'])
    end
  end
  task update_predict: :environment do
    require 'rest-client'
    response = RestClient.post 'http://im.kayac.com/api/post/elvis' ,message: '早安，村民！準備迎接這美好的一天了嗎？', content_type: 'application/x-www-form-urlencoded' 
    puts "#{response},#{Time.now}"
  end
end


