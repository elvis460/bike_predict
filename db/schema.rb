# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160518024550) do

  create_table "predict_infos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.datetime "time"
    t.integer  "count"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "station_info_id"
  end

  create_table "station_infos", id: :integer, unsigned: true, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.string  "sname",     limit: 30,  null: false
    t.integer "total",                 null: false, unsigned: true
    t.string  "district",  limit: 10,  null: false
    t.string  "lat",       limit: 20,  null: false
    t.string  "lng",       limit: 20,  null: false
    t.string  "addr",      limit: 150, null: false
    t.string  "districtE", limit: 20,  null: false
    t.string  "nameE",     limit: 100, null: false
    t.string  "addrE",     limit: 150, null: false
  end

end
