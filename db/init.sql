CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  address VARCHAR(255),
  zipcode VARCHAR(255),
  city VARCHAR(255),
  avatar VARCHAR(255),
  birthday DATE,
  first_seen DATE,
  last_seen DATE,
  has_ordered BOOLEAN,
  latest_purchase DATE,
  has_newsletter BOOLEAN,
  groups JSON,
  nb_commands INTEGER,
  total_spent FLOAT
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER,
  reference VARCHAR(255),
  width FLOAT,
  height FLOAT,
  price FLOAT,
  thumbnail VARCHAR(255),
  image VARCHAR(255),
  description VARCHAR(500),
  stock INTEGER
);

ALTER TABLE products ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES categories(id);

CREATE TABLE commands (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(255),
  date DATE,
  customer_id INTEGER,
  basket JSON,
  total_ex_taxes FLOAT,
  delivery_fees FLOAT,
  tax_rate FLOAT,
  taxes FLOAT,
  total FLOAT,
  status VARCHAR(255),
  returned BOOLEAN
);

ALTER TABLE commands ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(id);

-- Create table reviews

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  date DATE,
  status VARCHAR(255),
  command_id INTEGER,
  product_id INTEGER,
  customer_id INTEGER,
  rating INTEGER,
  comment VARCHAR
);

ALTER TABLE reviews ADD CONSTRAINT fk_command_id FOREIGN KEY (command_id) REFERENCES commands(id);
ALTER TABLE reviews ADD CONSTRAINT fk_product_id FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE reviews ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(id);

CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  date DATE,
  command_id INTEGER,
  customer_id INTEGER,
  total_ex_taxes FLOAT,
  delivery_fees FLOAT,
  tax_rate FLOAT,
  taxes FLOAT,
  total FLOAT
);

ALTER TABLE invoices ADD CONSTRAINT fk_command_id FOREIGN KEY (command_id) REFERENCES commands(id);
ALTER TABLE invoices ADD CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(id);

create role web_anon nologin;

grant all on schema public to web_anon;
grant all on public.categories to web_anon;
grant all on public.commands to web_anon;
grant all on public.customers to web_anon;
grant all on public.invoices to web_anon;
grant all on public.products to web_anon;
grant all on public.invoices to web_anon;

create role authenticator noinherit login password 'mysecretpassword';
grant web_anon to authenticator;