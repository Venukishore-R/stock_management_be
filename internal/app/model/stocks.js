const { DataTypes } = require('sequelize');
const sequelize = require('../../database/db');

const products = require('./products')

const stocks = sequelize.define(
  'stocks',
  {
    productId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      references: {
        model: products,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    itemsSold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    revenueGenerated: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'stocks',
    timestamps: false
  }
);

module.exports = stocks;
