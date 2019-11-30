# frozen_string_literal: true

class CreateEmails < ActiveRecord::Migration[6.0]
  def change
    create_table :emails do |t|
      t.integer :status, default: 0, null: false
      t.belongs_to :person, null: false, foreign_key: true
      t.string :draft_id
      t.string :message_id

      t.timestamps
    end
  end
end
