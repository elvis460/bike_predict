class AddStationInfoIdToPredictInfos < ActiveRecord::Migration[5.0]
  def change
    add_column :predict_infos, :station_info_id, :integer
  end
end
