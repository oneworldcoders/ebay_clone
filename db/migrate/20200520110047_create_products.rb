class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :title, null: false, default: ""
      t.string :subheader
      t.string :imageUrl
      t.string :imageTitle
      t.string :description

      t.timestamps
    end
  end
end
