# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_30_014351) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "emails", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.bigint "person_id", null: false
    t.string "draft_id"
    t.string "message_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_id"], name: "index_emails_on_person_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "person_id", null: false
    t.integer "status", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_id"], name: "index_messages_on_person_id"
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email_address"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email_address"], name: "index_people_on_email_address", unique: true
    t.index ["first_name", "last_name"], name: "index_people_on_first_name_and_last_name", unique: true
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.bigint "person_id", null: false
    t.string "flight_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["person_id"], name: "index_reservations_on_person_id"
  end

  add_foreign_key "emails", "people"
  add_foreign_key "messages", "people"
  add_foreign_key "reservations", "people"
end
