-- Drop and recreate Users table (Example)
-- DROP DATABASE IF EXISTS omitThePlates;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorite_menu_items CASCADE;
DROP TABLE IF EXISTS favorite_restaurants CASCADE;
DROP TABLE IF EXISTS operation_hours CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS nutrition_facts CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

-- CREATE DATABASE omitThePlates;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone_number CHAR(10) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  contact_number CHAR(10) NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  description VARCHAR(255) NOT NULL,
  preparation_time TIME NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  isactive BOOLEAN DEFAULT TRUE,
  type VARCHAR(255) NOT NULL,
  feature_item BOOLEAN DEFAULT FALSE,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  creation_time TIMESTAMP NOT NULL,
  accepted_time TIMESTAMP NOT NULL,
  ready_time TIMESTAMP,
  pickup_time TIMESTAMP NOT NULL,
  note VARCHAR(255),
  price INTEGER NOT NULL,
  tips INTEGER,
  delivery_charge INTEGER,
  tax INTEGER NOT NULL
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE TABLE operation_hours (
  id SERIAL PRIMARY KEY NOT NULL,
  from_time TIME,
  to_time TIME,
  business_day VARCHAR(255) NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  status VARCHAR(255) NOT NULL
);

CREATE TABLE favorite_restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
);

CREATE TABLE favorite_menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE
);

CREATE TABLE nutrition_facts (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  calories INTEGER NOT NULL,
  protein INTEGER,
  total_fat INTEGER,
  saturated_fat INTEGER,
  trans_fat INTEGER,
  cholesterol INTEGER,
  sodium INTEGER,
  total_carbohydrate INTEGER,
  dietary_fiber INTEGER,
  total_sugar INTEGER,
  vitamin_D INTEGER,
  calcium INTEGER,
  iron INTEGER,
  potassium INTEGER
);

-- To kill the ongoing connections
-- SELECT
--     pg_terminate_backend(pid)
-- FROM
--     pg_stat_activity
-- WHERE
--     pid <> pg_backend_pid()
--     AND datname = 'omittheplates'
--     ;
