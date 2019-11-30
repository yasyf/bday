# frozen_string_literal: true

class Reservation < ApplicationRecord
  belongs_to :person

  enum status: { pending: 0, comitted: 1, confirmed: 2, rejected: 3 }
end
