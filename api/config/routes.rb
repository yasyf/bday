# frozen_string_literal: true

Rails.application.routes.draw do
  resources :persons do
    collection do
      post :find
    end
  end
end
