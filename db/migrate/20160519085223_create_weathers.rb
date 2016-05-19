class CreateWeathers < ActiveRecord::Migration[5.0]
  def change
    create_table :weathers do |t|
      t.float :temp
      t.string :status
      t.integer :count

      t.timestamps
    end
  end
end
