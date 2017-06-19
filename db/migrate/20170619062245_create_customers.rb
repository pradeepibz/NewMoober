class CreateCustomers < ActiveRecord::Migration[5.0]
  def change
    create_table :customers do |t|
      t.string :full_name
      t.string :company
      t.text :site_url
      t.string :email
      t.string :city
      t.string :state
      t.string :phone
      t.string :find_through

      t.timestamps
    end
  end
end
