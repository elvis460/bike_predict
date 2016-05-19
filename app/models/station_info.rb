class StationInfo < ApplicationRecord
  has_many :predict_infos
  has_one :weather
end
