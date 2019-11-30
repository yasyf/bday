# frozen_string_literal: true

class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :first_name
      t.string :last_name
      t.string :email_address

      t.timestamps

      t.index [:email_address], unique: true
      t.index %i[first_name last_name], unique: true
    end
  end
end
