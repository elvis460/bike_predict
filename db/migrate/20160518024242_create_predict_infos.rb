class CreatePredictInfos < ActiveRecord::Migration[5.0]
  def change
    create_table :predict_infos do |t|
      t.datetime :time
      t.integer :count

      t.timestamps
    end
  end
end
