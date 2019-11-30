# frozen_string_literal: true

class Reservation < ApplicationRecord
  belongs_to :person

  enum status: { pending: 0, committed: 1, confirmed: 2, rejected: 3 }, _suffix: true
end
