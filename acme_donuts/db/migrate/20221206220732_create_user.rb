class CreateUser < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :canonical_id, null: false
      t.string :access_token, null: false
      t.string :country, null: false
      t.boolean :employee, null: false

      t.timestamps
    end
  end
end
