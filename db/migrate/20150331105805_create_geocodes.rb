class CreateGeocode < ActiveRecord::Migration
  def change
    create_table :geocodes do |t|
      t.string :latitude
      t.string :longitude
      t.belongs_to :user

      t.timestamps
    end
  end
end
