import generateData from "data-generator-retail";
import postgres from "postgres";

// Create postgres connection to localhost:5432 with user authenticator and password mysecretpassword
const sql = postgres({
  host: "db",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
});

const initData = async () => {
  // check if there is already data in the database
  const exisingCustomers = await sql`SELECT * FROM customers`;
  if (exisingCustomers.length > 0) {
    console.log("Data already exists in the database");
    return;
  }

  const data = generateData({ serializeDate: true });

  const customers = data.customers;

  await Promise.all(
    customers.map(async (customer) => {
      await sql`INSERT INTO customers (
        id, 
        first_name, 
        last_name, 
        email,
        address,
        zipcode,
        city,
        birthday,
        first_seen,
        last_seen,
        has_ordered,
        latest_purchase,
        has_newsletter,
        groups,
        nb_commands,
        total_spent) VALUES (
            ${customer.id}, 
            ${customer.first_name}, 
            ${customer.last_name}, 
            ${customer.email}, 
            ${customer.address}, 
            ${customer.zipcode}, 
            ${customer.city}, 
            ${customer.birthday}, ${customer.first_seen}, ${customer.last_seen}, ${customer.has_ordered}, ${customer.latest_purchase}, ${customer.has_newsletter}, ${customer.groups}, ${customer.nb_commands}, ${customer.total_spent})`;
    })
  );
  console.log("Customers inserted");

  const categories = data.categories;

  await Promise.all(
    categories.map(async (category) => {
      await sql`INSERT INTO categories (id, name) VALUES (${category.id}, ${category.name})`;
    })
  );

  console.log("Categories inserted");

  const products = data.products;

  await Promise.all(
    products.map(async (product) => {
      await sql`INSERT INTO products (
        id, 
        category_id,
        reference,
        width,
        height,
        price,
        thumbnail,
        image,
        description,
        stock) 
    VALUES (
        ${product.id}, 
        ${product.category_id}, 
        ${product.reference}, 
        ${product.width}, 
        ${product.height}, 
        ${product.price}, 
        ${product.thumbnail}, 
        ${product.image}, 
        ${product.description}, 
        ${product.stock})`;
    })
  );

  console.log("Products inserted");

  const commands = data.commands;

  await Promise.all(
    commands.map(async (command) => {
      await sql`INSERT INTO commands (
        id, 
        reference, 
        date, 
        customer_id, 
        basket, 
        total_ex_taxes, 
        delivery_fees, 
        tax_rate, 
        taxes, 
        total, 
        status, 
        returned) 
        VALUES (
            ${command.id}, 
            ${command.reference}, 
            ${command.date}, 
            ${command.customer_id}, 
            ${command.basket}, 
            ${command.total_ex_taxes}, 
            ${command.delivery_fees}, 
            ${command.tax_rate}, 
            ${command.taxes}, 
            ${command.total}, 
            ${command.status}, 
            ${command.returned})`;
    })
  );

  console.log("Commands inserted");

  const reviews = data.reviews;

  await Promise.all(
    reviews.map(async (review) => {
      await sql`INSERT INTO reviews (
        id, 
        date, 
        status, 
        command_id, 
        product_id, 
        customer_id, 
        rating, 
        comment) 
        VALUES (
            ${review.id}, 
            ${review.date}, 
            ${review.status}, 
            ${review.command_id}, 
            ${review.product_id}, 
            ${review.customer_id}, 
            ${review.rating}, 
            ${review.comment})`;
    })
  );

  console.log("Reviews inserted");

  const invoices = data.invoices;

  await Promise.all(
    invoices.map(async (invoice) => {
      await sql`INSERT INTO invoices (
        id,
        date,
        command_id,
        customer_id,
        total_ex_taxes,
        delivery_fees,
        tax_rate,
        taxes,
        total) VALUES (
            ${invoice.id}, 
            ${invoice.date}, 
            ${invoice.command_id}, 
            ${invoice.customer_id}, 
            ${invoice.total_ex_taxes}, 
            ${invoice.delivery_fees}, 
            ${invoice.tax_rate}, 
            ${invoice.taxes}, 
            ${invoice.total})`;
    })
  );

  console.log("Invoices inserted");
  return;
};

initData()
  .then(() => {
    console.log("Data inserted");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
