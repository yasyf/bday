# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def add_person!(name, email)
  first_name, last_name = name.split(' ')
  attrs = { email_address: email, first_name: first_name, last_name: last_name }
  if (found = Person.where(attrs.slice(:email)).or(Person.where(attrs.slice(:first_name, :last_name))).first)
    found.update! **attrs
  else
    Person.create! **attrs
  end
end

add_person! 'Yasyf Mohamedali', 'yasyfm@gmail.com'
