class CreatePromoCodes < ActiveRecord::Migration[5.0]
  def change
    create_table :promo_codes do |t|
      t.integer :facebook_user_id
      t.string :promo_code
      t.boolean :is_used
      t.float :discount

      t.timestamps
    end
  end
end
