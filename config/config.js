module.exports = {
  development: {
    username: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: "node_ecommerce",
    host: process.env.MY_SQL_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
