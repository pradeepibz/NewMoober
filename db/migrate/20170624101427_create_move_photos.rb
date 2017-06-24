class CreateMovePhotos < ActiveRecord::Migration[5.0]
  def change
    create_table :move_photos do |t|
      t.string :avatar
      t.boolean :is_valid, default: false

      t.timestamps
    end
  end
end
