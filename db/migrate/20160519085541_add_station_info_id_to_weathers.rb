class AddStationInfoIdToWeathers < ActiveRecord::Migration[5.0]
  def change
    add_column :weathers, :station_info_id, :integer
  end
end
