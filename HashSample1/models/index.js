"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("MariaDB 데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });

//db.users = require("./User.js")(sequelize, DataTypes);
db.userhashs = require("./UserHash.js")(sequelize, DataTypes);

module.exports = db;
