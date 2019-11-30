# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :person

  enum status: { unsent: 0, sent: 1 }
end
