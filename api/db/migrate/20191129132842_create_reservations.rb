# frozen_string_literal: true

class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.integer :status, default: 0, null: false
      t.belongs_to :person, null: false, foreign_key: true
      t.string :flight_number

      t.timestamps
    end
  end
end
