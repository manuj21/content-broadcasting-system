const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Content = sequelize.define("Content", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  subject: DataTypes.STRING,
  file_path: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("pending", "approved", "rejected"),
    defaultValue: "pending",
  },
  rejection_reason: DataTypes.STRING,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
});

module.exports = Content;
