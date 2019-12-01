# frozen_string_literal: true

Rails.application.routes.draw do
  resources :persons do
    collection do
      post :find
    end
    member do
      get :tracking_image
      get :tracking_link
    end
  end
end
