const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Schedule = sequelize.define("Schedule", {
  rotation_order: DataTypes.INTEGER,
  duration: DataTypes.INTEGER, // minutes
});

module.exports = Schedule;