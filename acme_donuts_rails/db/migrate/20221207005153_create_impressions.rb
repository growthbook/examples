class CreateImpressions < ActiveRecord::Migration[6.1]
  def change
    create_table :impressions do |t|
      t.json :experiment, null: false
      t.json :result, null: false

      t.timestamps
    end
  end
end
