class CreateFacebookUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :facebook_users do |t|
      t.string :name
      t.string :email
      t.string :fb_access_token
      t.string :provider
      t.string :uid
      t.float :discount

      t.timestamps
    end
  end
end
