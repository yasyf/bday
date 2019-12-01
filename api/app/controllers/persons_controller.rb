# frozen_string_literal: true

class PersonsController < ApplicationController
  TRANSPARENT_GIF = Base64.decode64('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==')

  def index
    render json: Person.all
  end

  def update
    if update_params[:committed] == true
      person.reservation.update! status: :committed
    elsif update_params[:committed] == false
      person.reservation.update! status: :rejected
    end

    if update_params[:flight_number].present?
      person.reservation.update! flight_number: update_params[:flight_number]
    end

    render json: person
  end

  def find
    render json: Person.where(**find_params.to_h.symbolize_keys).first
  end

  def invite_image
    person.email.update! status: :opened if person.email.status == 'delivered'
    render body: TRANSPARENT_GIF, content_type: 'image/gif'
  end

  def invite_link
    person.email.update! status: :clicked if person.email.status.in? %w[delivered opened]
    redirect_to "#{ENV['FRONTEND_URL']}?email=#{person.email_address}"
  end

  private

  def person
    @person ||= Person.find(params[:id])
  end

  def update_params
    params.require(:person).permit(:committed, :flight_number)
  end

  def find_params
    params.require(:person).permit(:email_address)
  end
end
