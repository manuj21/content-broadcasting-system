const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite", // file will be created automatically
  logging: false,
});

module.exports = sequelize;