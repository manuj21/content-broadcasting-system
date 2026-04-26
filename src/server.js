require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");

sequelize.sync().then(() => {
  console.log("Database connected (SQLite)");

  app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port", process.env.PORT || 5000);
  });
});