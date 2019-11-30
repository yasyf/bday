# frozen_string_literal: true

class Person < ApplicationRecord
  validates :email_address, 'valid_email_2/email': true

  has_one :email, dependent: :destroy
  has_one :reservation, dependent: :destroy
  has_one :message, dependent: :destroy

  after_create :create_reservation!, :create_email!, :create_message!

  def status
    return reservation.status if reservation.status != 'pending'
    return email.status if email.present?
    'pending'
  end

  def as_json(options = {})
    super options.reverse_merge(methods: [:status], include: [:email, :reservation, :message])
  end
end
