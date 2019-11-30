# frozen_string_literal: true

class PersonsController < ApplicationController
  def index
    render json: Person.all
  end

  def find
    render json: Person.where(**find_params.to_h.symbolize_keys).first
  end

  private

  def find_params
    params.require(:person).permit(:email_address)
  end
end
