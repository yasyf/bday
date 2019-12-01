# frozen_string_literal: true

Rails.application.routes.draw do
  resources :persons do
    collection do
      post :find
    end
    member do
      get :invite_image
      get :invite_link
      post :send_email
      post :send_message
    end
  end
end
