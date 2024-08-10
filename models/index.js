'use strict'
require('dotenv').config()
const fs = require('fs')

const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const db = {}
const env = process.env.NODE_ENV || 'development'

let config = require('../config/config.json')[env]

config = {
  ...config,
  username: process.env.RDS_USERNAME || config.username,
  password: process.env.RDS_PASSWORD || config.password,
  host: process.env.RDS_HOST || config.host,
  database: process.env.RDS_DB_NAME || config.database
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    dialectModule: require('mysql2')
  }
)

// 動態引入其他 models
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

// 設定 Models 之間的關聯
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// 匯出需要的物件
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
